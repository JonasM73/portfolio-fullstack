var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/profile", () =>
{
    return Results.Ok(new
    {
        firstName = "Jonas",
        lastName = "Mionnet",
        title = "Étudiant ingénieur informatique en alternance",
        location = "Lyon, France",
        description = "Développeur orienté web, microservices, data/BI et cybersécurité.",
        skills = new[]
        {
            "React", "TypeScript", "C#", ".NET", "ASP.NET Core",
            "Docker", "MongoDB", "SQL", "BI", "Cybersécurité"
        }
    });
});

app.Run();