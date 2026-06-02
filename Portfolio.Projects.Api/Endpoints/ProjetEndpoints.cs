using Portfolio.Projects.Api.Dtos;
using Portfolio.Projects.Api.Models;
using Portfolio.Projects.Api.Services;

namespace Portfolio.Projects.Api.Endpoints;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(
        this WebApplication app)
    {
        // =====================
        // PUBLIC PROJECTS
        // =====================

        app.MapGet("/api/projects", async (
            ProjectService service) =>
        {
            var projects =
                await service.GetPublishedAsync();

            return Results.Ok(
                projects.Select(ToResponse)
            );
        });

        app.MapGet("/api/projects/{id}", async (
            string id,
            ProjectService service) =>
        {
            var project =
                await service.GetByIdAsync(id);

            return project is null
                ? Results.NotFound()
                : Results.Ok(
                    ToResponse(project)
                );
        });

        // =====================
        // ADMIN PROJECTS
        // =====================

        app.MapGet("/api/admin/projects", async (
            ProjectService service) =>
        {
            var projects =
                await service.GetAllAdminAsync();

            return Results.Ok(
                projects.Select(ToResponse)
            );
        })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));

        app.MapPost("/api/projects", async (
            ProjectCreateRequest request,
            ProjectService service) =>
        {
            var project =
                await service.CreateAsync(
                    request
                );

            return Results.Created(
                $"/api/projects/{project.Id}",
                ToResponse(project)
            );
        })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));

        app.MapPut("/api/projects/{id}", async (
            string id,
            ProjectUpdateRequest request,
            ProjectService service) =>
        {
            var updated =
                await service.UpdateAsync(
                    id,
                    request
                );

            return updated
                ? Results.Ok(new
                {
                    message =
                        "Projet mis à jour"
                })
                : Results.NotFound();
        })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));

        app.MapDelete("/api/projects/{id}", async (
            string id,
            ProjectService service) =>
        {
            var deleted =
                await service.DeleteAsync(id);

            return deleted
                ? Results.NoContent()
                : Results.NotFound();
        })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));

        // =====================
        // TOGGLE PUBLISH
        // =====================

        app.MapPatch(
            "/api/projects/{id}/publish",
            async (
                string id,
                ProjectToggleRequest request,
                ProjectService service) =>
            {
                var updated =
                    await service.TogglePublishAsync(
                        id,
                        request.Value
                    );

                return updated
                    ? Results.Ok()
                    : Results.NotFound();
            })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));

        // =====================
        // TOGGLE FEATURED
        // =====================

        app.MapPatch(
            "/api/projects/{id}/featured",
            async (
                string id,
                ProjectToggleRequest request,
                ProjectService service) =>
            {
                var updated =
                    await service.ToggleFeaturedAsync(
                        id,
                        request.Value
                    );

                return updated
                    ? Results.Ok()
                    : Results.NotFound();
            })
        .RequireAuthorization(policy =>
            policy.RequireRole("Admin"));
    }

    private static object ToResponse(
        Project project)
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

            project.IsPublished,
            project.IsFeatured,
            project.DisplayOrder,

            project.CreatedAt,
            project.UpdatedAt
        };
    }
}