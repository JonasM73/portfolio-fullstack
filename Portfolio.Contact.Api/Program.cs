using MongoDB.Driver;
using Portfolio.Contact.Api.Dtos;
using Portfolio.Contact.Api.Models;
using Resend;

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.MapPost("/api/contact", async (
    ContactCreateRequest request,
    IMongoCollection<ContactMessage> collection,
    IResend resend,
    IConfiguration configuration) =>
{
    var message = new ContactMessage
    {
        Name = request.Name,
        Email = request.Email,
        Subject = request.Subject,
        Message = request.Message,
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
        Console.WriteLine($"Erreur Resend : {ex.Message}");
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
});

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
});

app.Run();