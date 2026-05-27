using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Portfolio.Projects.Api.Dtos;
using Portfolio.Projects.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var jwtKey = builder.Configuration["Jwt:Key"];
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];

var mongoConnectionString = builder.Configuration["MongoDb:ConnectionString"];
var mongoDatabaseName = builder.Configuration["MongoDb:DatabaseName"];
var projectsCollectionName = builder.Configuration["MongoDb:ProjectsCollection"];

builder.Services.AddSingleton<IMongoClient>(_ =>
    new MongoClient(mongoConnectionString));

builder.Services.AddSingleton(sp =>
{
    var client = sp.GetRequiredService<IMongoClient>();
    var database = client.GetDatabase(mongoDatabaseName);
    return database.GetCollection<Project>(projectsCollectionName);
});

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
            ValidIssuer = issuer,
            ValidAudience = audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey!)
            )
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/api/projects", async (IMongoCollection<Project> collection) =>
{
    var projects = await collection
        .Find(_ => true)
        .SortByDescending(p => p.CreatedAt)
        .ToListAsync();

    return Results.Ok(projects);
});

app.MapGet("/api/projects", async (IMongoCollection<Project> collection) =>
{
    var projects = await collection
        .Find(_ => true)
        .SortByDescending(p => p.CreatedAt)
        .ToListAsync();

    var response = projects.Select(project => new
    {
        Id = project.Id.ToString(),
        project.Title,
        project.Description,
        project.Technologies,
        project.GithubUrl,
        project.DemoUrl,
        project.CreatedAt,
        project.UpdatedAt
    });

    return Results.Ok(response);
});

app.MapPut("/api/projects/{id}", async (
    string id,
    ProjectUpdateRequest request,
    IMongoCollection<Project> collection) =>
{
    if (!MongoDB.Bson.ObjectId.TryParse(id, out var objectId))
    {
        return Results.BadRequest("Invalid project id");
    }

    var update = Builders<Project>.Update
        .Set(p => p.Title, request.Title)
        .Set(p => p.Description, request.Description)
        .Set(p => p.Technologies, request.Technologies)
        .Set(p => p.GithubUrl, request.GithubUrl)
        .Set(p => p.DemoUrl, request.DemoUrl)
        .Set(p => p.UpdatedAt, DateTime.UtcNow);

    var result = await collection.UpdateOneAsync(
        p => p.Id == objectId,
        update
    );

    return result.MatchedCount == 0
        ? Results.NotFound()
        : Results.Ok(new { message = "Project updated successfully" });
})
.RequireAuthorization(policy => policy.RequireRole("Admin"));

app.MapDelete("/api/projects/{id}", async (
    string id,
    IMongoCollection<Project> collection) =>
{
    if (!MongoDB.Bson.ObjectId.TryParse(id, out var objectId))
    {
        return Results.BadRequest("Invalid project id");
    }

    var result = await collection.DeleteOneAsync(p => p.Id == objectId);

    return result.DeletedCount == 0
        ? Results.NotFound()
        : Results.NoContent();
})
.RequireAuthorization(policy => policy.RequireRole("Admin"));

app.MapPost("/api/projects", async (
    ProjectCreateRequest request,
    IMongoCollection<Project> collection) =>
{
    var project = new Project
    {
        Title = request.Title,
        Description = request.Description,
        Technologies = request.Technologies,
        GithubUrl = request.GithubUrl,
        DemoUrl = request.DemoUrl,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    await collection.InsertOneAsync(project);

    return Results.Created($"/api/projects/{project.Id}", new
    {
        Id = project.Id.ToString(),
        project.Title,
        project.Description,
        project.Technologies,
        project.GithubUrl,
        project.DemoUrl,
        project.CreatedAt,
        project.UpdatedAt
    });
})
.RequireAuthorization(policy => policy.RequireRole("Admin"));

app.Run();