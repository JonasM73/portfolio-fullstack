using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using Portfolio.Auth.Api.Dtos;
using Portfolio.Auth.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Portfolio.Auth.Api",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Entre le token JWT comme ceci : Bearer TON_TOKEN",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .SetIsOriginAllowed(origin =>
                origin.StartsWith("http://localhost:") ||
                origin.StartsWith("https://localhost:"))
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var mongoConnectionString = builder.Configuration["MongoDb:ConnectionString"];
var mongoDatabaseName = builder.Configuration["MongoDb:DatabaseName"] ?? "portfolio-db";

if (string.IsNullOrWhiteSpace(mongoConnectionString))
    throw new InvalidOperationException("MongoDb connection string is missing.");

builder.Services.AddSingleton<IMongoClient>(_ => new MongoClient(mongoConnectionString));
builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    return client.GetDatabase(mongoDatabaseName);
});

var jwtKey = builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException("JWT key is missing.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("RequireUserOrPremium", policy =>
        policy.RequireRole("User", "Premium"));

    options.AddPolicy("RequireAuthenticated", policy =>
        policy.RequireAuthenticatedUser());
});

builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<PasswordPolicyService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<ProfileClient>();
builder.Services.AddHttpClient(
    "ProfileApi",
    client =>
    {
        client.BaseAddress =
            new Uri("https://localhost:7077");
    });
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapPost("/api/auth/setup", async (
    SetupAdminRequest request,
    AuthService authService,
    ProfileClient profileClient) =>
{
    var result =
        await authService.CreateFirstAdminAsync(request);

    if (!result.Success)
    {
        return Results.Conflict(new
        {
            message = result.Message
        });
    }

    var admin =
        await authService.GetUserByEmailAsync(
            request.Email
        );

    if (admin is not null)
    {
        await profileClient.CreateProfileAsync(
            admin.Id.ToString(),
            admin.Email
        );
    }

    return Results.Ok(new
    {
        message = result.Message
    });
});

app.MapPost("/api/auth/login", async (
    LoginRequest request,
    AuthService authService) =>
{
    var result = await authService.LoginAsync(request);

    return result is null
        ? Results.Unauthorized()
        : Results.Ok(result);
});

app.MapGet("/api/auth/me", (ClaimsPrincipal user) =>
{
    var id = user.FindFirstValue(ClaimTypes.NameIdentifier);
    var email = user.FindFirstValue(ClaimTypes.Email);
    var fullName = user.FindFirstValue(ClaimTypes.Name);
    var role = user.FindFirstValue(ClaimTypes.Role);

    return Results.Ok(new MeResponse(
        id ?? string.Empty,
        email ?? string.Empty,
        fullName ?? string.Empty,
        role ?? string.Empty
    ));
})
.RequireAuthorization("RequireAuthenticated");

app.MapGet("/api/auth/users", async (AuthService authService) =>
{
    var users = await authService.GetUsersAsync();

    return Results.Ok(users.Select(u => new
    {
        id = u.Id.ToString(),
        u.Email,
        u.FullName,
        u.Role,
        u.CreatedAt,
        u.UpdatedAt
    }));
})
.RequireAuthorization("RequireAdmin");

app.MapGet("/api/auth/users/{id}", async (
    string id,
    AuthService authService) =>
{
    var user = await authService.GetUserByIdAsync(id);

    if (user is null)
        return Results.NotFound(new { message = "Utilisateur introuvable." });

    return Results.Ok(new
    {
        id = user.Id.ToString(),
        user.Email,
        user.FullName,
        user.Role,
        user.CreatedAt,
        user.UpdatedAt
    });
})
.RequireAuthorization("RequireAdmin");

app.MapPost("/api/auth/users", async (
    CreateUserRequest request,
    AuthService authService,
    ProfileClient profileClient) =>
{
    var result =
        await authService.CreateUserAsync(request);

    if (!result.Success)
    {
        return Results.BadRequest(new
        {
            message = result.Message
        });
    }

    var user =
        await authService.GetUserByEmailAsync(
            request.Email
        );

    if (user is not null)
    {
        await profileClient.CreateProfileAsync(
            user.Id.ToString(),
            user.Email
        );
    }

    return Results.Ok(new
    {
        message = result.Message
    });
})
.RequireAuthorization("RequireAdmin");

app.MapPut("/api/auth/users/{id}", async (
    string id,
    UpdateUserRequest request,
    AuthService authService) =>
{
    var result = await authService.UpdateUserAsync(id, request);

    return result.Success
        ? Results.Ok(new { message = result.Message })
        : Results.BadRequest(new { message = result.Message });
})
.RequireAuthorization("RequireAdmin");

app.MapDelete("/api/auth/users/{id}", async (
    string id,
    AuthService authService,
    ProfileClient profileClient) =>
{
    await profileClient.DeleteProfileAsync(id);

    var result = await authService.DeleteUserAsync(id);

    if (!result.Success)
    {
        return Results.NotFound(new
        {
            message = result.Message
        });
    }

    return Results.Ok(new
    {
        message = result.Message
    });
})
.RequireAuthorization("RequireAdmin");


app.MapPut("/api/auth/change-password", async (
    ChangePasswordRequest request,
    ClaimsPrincipal user,
    AuthService authService) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

    if (string.IsNullOrWhiteSpace(userId))
        return Results.Unauthorized();

    var result = await authService.ChangePasswordAsync(userId, request);

    return result.Success
        ? Results.Ok(new { message = result.Message })
        : Results.BadRequest(new { message = result.Message });
})
.RequireAuthorization("RequireAuthenticated");

app.MapDelete("/api/auth/me", async (
    ClaimsPrincipal user,
    AuthService authService) =>
{
    var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

    if (string.IsNullOrWhiteSpace(userId))
        return Results.Unauthorized();

    var result = await authService.DeleteOwnAccountAsync(userId);

    return result.Success
        ? Results.Ok(new { message = result.Message })
        : Results.BadRequest(new { message = result.Message });
})
.RequireAuthorization("RequireAuthenticated");

app.Run();