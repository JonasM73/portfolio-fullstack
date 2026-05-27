using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

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
                origin.StartsWith("https://localhost:")
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var adminEmail = builder.Configuration["AdminUser:Email"];
var adminPassword = builder.Configuration["AdminUser:Password"];

var jwtKey = builder.Configuration["Jwt:Key"];
var issuer = builder.Configuration["Jwt:Issuer"];
var audience = builder.Configuration["Jwt:Audience"];

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.MapPost("/api/auth/login", (LoginRequest request) =>
{
    if (request.Email != adminEmail || request.Password != adminPassword)
    {
        return Results.Unauthorized();
    }

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, "Jonas Mionnet"),
        new Claim(ClaimTypes.Email, request.Email),
        new Claim(ClaimTypes.Role, "Admin")
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey!));
    var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: issuer,
        audience: audience,
        claims: claims,
        expires: DateTime.UtcNow.AddHours(2),
        signingCredentials: credentials
    );

    return Results.Ok(new
    {
        token = new JwtSecurityTokenHandler().WriteToken(token),
        role = "Admin",
        expiresIn = "2h"
    });
});

app.Run();

record LoginRequest(string Email, string Password);