using Portfolio.Projects.Api.Dtos;
using Portfolio.Projects.Api.Models;
using Portfolio.Projects.Api.Services;

namespace Portfolio.Projects.Api.Endpoints;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this WebApplication app)
    {
        app.MapGet("/api/projects", async (ProjectService service) =>
        {
            var projects = await service.GetAllAsync();

            return Results.Ok(projects.Select(ToResponse));
        });

        app.MapGet("/api/projects/{id}", async (
            string id,
            ProjectService service) =>
        {
            var project = await service.GetByIdAsync(id);

            return project is null
                ? Results.NotFound()
                : Results.Ok(ToResponse(project));
        });

        app.MapPost("/api/projects", async (
            ProjectCreateRequest request,
            ProjectService service) =>
        {
            var project = await service.CreateAsync(request);

            return Results.Created(
                $"/api/projects/{project.Id}",
                ToResponse(project)
            );
        })
        .RequireAuthorization(policy => policy.RequireRole("Admin"));

        app.MapPut("/api/projects/{id}", async (
            string id,
            ProjectUpdateRequest request,
            ProjectService service) =>
        {
            var updated = await service.UpdateAsync(id, request);

            return updated
                ? Results.Ok(new { message = "Project updated successfully" })
                : Results.NotFound("Project not found");
        })
        .RequireAuthorization(policy => policy.RequireRole("Admin"));

        app.MapDelete("/api/projects/{id}", async (
            string id,
            ProjectService service) =>
        {
            var deleted = await service.DeleteAsync(id);

            return deleted
                ? Results.NoContent()
                : Results.NotFound("Project not found");
        })
        .RequireAuthorization(policy => policy.RequireRole("Admin"));
    }

    private static object ToResponse(Project project)
    {
        return new
        {
            Id = project.Id.ToString(),
            project.Title,
            project.Description,
            project.Goal,
            project.Context,
            project.Technologies,
            project.Roles,
            project.Images,
            project.Documents,
            project.StartDate,
            project.EndDate,
            project.TeamSize,
            project.ProjectType,
            project.Schools,
            project.Companies,
            project.City,
            project.Country,
            project.GithubUrl,
            project.DemoUrl,
            project.CreatedAt,
            project.UpdatedAt
        };
    }
}