using MongoDB.Driver;
using Portfolio.Contact.Api.Dtos;
using Portfolio.Contact.Api.Models;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using Portfolio.Contact.Api.Security;
using Resend;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("ContactLimiter", limiterOptions =>
    {
        limiterOptions.PermitLimit = 5;
        limiterOptions.Window = TimeSpan.FromMinutes(1);
        limiterOptions.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
        limiterOptions.QueueLimit = 0;
    });

    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];

if (!builder.Environment.IsDevelopment() && allowedOrigins.Length == 0)
{
    throw new InvalidOperationException(
        "CORS configuration missing: Cors:AllowedOrigins must contain the production frontend domain."
    );
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(allowedOrigins)
            .WithMethods("GET", "POST", "PUT", "DELETE")
            .WithHeaders("Content-Type", "Authorization");
    });
});

var mongoConnectionString = builder.Configuration["MongoDb:ConnectionString"];
var mongoDatabaseName = builder.Configuration["MongoDb:DatabaseName"];
var messagesCollectionName = builder.Configuration["MongoDb:MessagesCollection"];

builder.Services.AddSingleton<IMongoClient>(_ =>
    new MongoClient(mongoConnectionString));

builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(mongoDatabaseName);
    return database.GetCollection<ContactMessage>(messagesCollectionName);
});

builder.Services.AddHttpClient<ResendClient>();
builder.Services.Configure<ResendClientOptions>(options =>
{
    options.ApiToken = builder.Configuration["Resend:ApiKey"]!;
});
builder.Services.AddTransient<IResend, ResendClient>();
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
            ),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();
app.MapPost("/api/contact", async (
    ContactCreateRequest request,
    IMongoCollection<ContactMessage> collection,
    IResend resend,
    IConfiguration configuration) =>
{
    if (!string.IsNullOrWhiteSpace(request.Website))
    {
        return Results.BadRequest("Bot détecté.");
    }

    var validationError = ContactInputValidator.Validate(request);
    if (validationError != null)
    {
        return Results.BadRequest(validationError);
    }


    var message = new ContactMessage
    {
        Name = ContactInputValidator.Sanitize(request.Name),
        Email = ContactInputValidator.Sanitize(request.Email),
        Subject = ContactInputValidator.Sanitize(request.Subject),
        Message = ContactInputValidator.Sanitize(request.Message),
        ProjectId = request.ProjectId,
        ProjectTitle = request.ProjectTitle,
        CreatedAt = DateTime.UtcNow
    };
    await collection.InsertOneAsync(message);

    var from = configuration["Resend:From"]!;
    var to = configuration["Resend:To"]!;

    var projectLabel = string.IsNullOrWhiteSpace(message.ProjectTitle)
        ? "Aucun projet sélectionné"
        : message.ProjectTitle;

    var email = new EmailMessage
    {
        From = from,
        To = to,
        Subject = $"Portfolio - Nouveau message : {message.Subject}",
        HtmlBody = $"""
            <h2>Nouveau message depuis le portfolio</h2>

            <p><strong>Nom :</strong> {message.Name}</p>
            <p><strong>Email :</strong> {message.Email}</p>
            <p><strong>Sujet :</strong> {message.Subject}</p>
            <p><strong>Projet concerné :</strong> {projectLabel}</p>

            <p><strong>Message :</strong></p>
            <p>{message.Message}</p>
            """
    };

    try
    {
        await resend.EmailSendAsync(email);
    }
    catch (Exception ex)
    {
        app.Logger.LogError(ex, "Erreur lors de l’envoi de l’email via Resend.");
    }

    return Results.Created($"/api/contact/{message.Id}", new
    {
        Id = message.Id.ToString(),
        message.Name,
        message.Email,
        message.Subject,
        message.Message,
        message.ProjectId,
        message.ProjectTitle,
        message.CreatedAt
    });
})
.RequireRateLimiting("ContactLimiter");

app.MapGet("/api/contact/messages", async (
    IMongoCollection<ContactMessage> collection) =>
{
    var messages = await collection
        .Find(_ => true)
        .SortByDescending(m => m.CreatedAt)
        .ToListAsync();

    var response = messages.Select(message => new
    {
        Id = message.Id.ToString(),
        message.Name,
        message.Email,
        message.Subject,
        message.Message,
        message.ProjectId,
        message.ProjectTitle,
        message.CreatedAt
    });

    return Results.Ok(response);
})
.RequireAuthorization(policy =>
    policy.RequireRole("Admin"));

app.Run();