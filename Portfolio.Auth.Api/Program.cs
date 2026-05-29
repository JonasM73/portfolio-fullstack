using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Portfolio.Auth.Api.Dtos;
using Portfolio.Auth.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<AuthService>();

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

app.MapPost("/api/auth/login", async (
    LoginRequest request,
    AuthService authService) =>
{
    var result = await authService.LoginAsync(request);

    return result is null
        ? Results.Unauthorized()
        : Results.Ok(result);
});

 app.MapPost("/api/auth/setup", async (
    SetupAdminRequest request,
    AuthService authService) =>
{
    var created = await authService.CreateFirstAdminAsync(request);

    if (!created)
    {
        return Results.Conflict(new
        {
            message = "Un administrateur existe déjà."
        });
    }

    return Results.Created("/api/auth/login", new
    {
        message = "Administrateur créé avec succès."
    });
});

app.MapGet("/api/auth/me", (ClaimsPrincipal user) =>
{
    var email = user.FindFirstValue(ClaimTypes.Email);
    var fullName = user.FindFirstValue(ClaimTypes.Name);
    var role = user.FindFirstValue(ClaimTypes.Role);

    return Results.Ok(new MeResponse(
        email ?? string.Empty,
        fullName ?? string.Empty,
        role ?? string.Empty
    ));
})
.RequireAuthorization();

app.Run();