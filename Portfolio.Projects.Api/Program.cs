using Microsoft.AspNetCore.Http.Features;
using Portfolio.Projects.Api.Endpoints;
using Portfolio.Projects.Api.Extensions;
using Portfolio.Projects.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddProjectServices(builder.Configuration);
builder.Services.AddJwtAuthentication(builder.Configuration);
builder.Services.AddSingleton<AzureBlobStorageService>();
builder.Services.Configure<FormOptions>(options =>
{
    // Taille max upload : 100 Mo
    options.MultipartBodyLengthLimit = 100 * 1024 * 1024;
});

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

app.MapUploadEndpoints();
app.MapProjectEndpoints();

app.Run();