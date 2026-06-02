using MongoDB.Bson;
using MongoDB.Driver;
using Portfolio.Projects.Api.Dtos;
using Portfolio.Projects.Api.Models;

namespace Portfolio.Projects.Api.Services;

public class ProjectService
{
    private readonly IMongoCollection<Project> _collection;

    public ProjectService(IMongoCollection<Project> collection)
    {
        _collection = collection;
    }

    public async Task<List<Project>>
    GetPublishedAsync()
    {
        return await _collection
            .Find(p => p.IsPublished)
            .SortBy(p => p.DisplayOrder)
            .ToListAsync();
    }

    public async Task<List<Project>>
    GetAllAdminAsync()
    {
        return await _collection
            .Find(_ => true)
            .SortBy(p => p.DisplayOrder)
            .ToListAsync();
    }

    public async Task<Project?> GetByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
            return null;

        return await _collection
            .Find(p => p.Id == objectId)
            .FirstOrDefaultAsync();
    }
    public async Task<bool>
    TogglePublishAsync(
        string id,
        bool value)
    {
        if (!ObjectId.TryParse(
            id,
            out var objectId))
        {
            return false;
        }

        var update =
            Builders<Project>.Update
                .Set(
                    p => p.IsPublished,
                    value
                )
                .Set(
                    p => p.UpdatedAt,
                    DateTime.UtcNow
                );

        var result =
            await _collection.UpdateOneAsync(
                p => p.Id == objectId,
                update
            );

        return result.ModifiedCount > 0;
    }
    public async Task<bool>
    ToggleFeaturedAsync(
        string id,
        bool value)
    {
        if (!ObjectId.TryParse(
            id,
            out var objectId))
        {
            return false;
        }

        var update =
            Builders<Project>.Update
                .Set(
                    p => p.IsFeatured,
                    value
                )
                .Set(
                    p => p.UpdatedAt,
                    DateTime.UtcNow
                );

        var result =
            await _collection.UpdateOneAsync(
                p => p.Id == objectId,
                update
            );

        return result.ModifiedCount > 0;
    }
    public async Task<Project> CreateAsync(ProjectCreateRequest request)
    {
        Validate(request.Title, request.Description);

        var project = new Project
        {
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            Goal = request.Goal,
            Context = request.Context,
            Technologies = request.Technologies,
            Roles = request.Roles,
            Images = request.Images,
            Documents = request.Documents,
            StartDate = request.StartDate,
            EndDate = request.EndDate,
            TeamSize = request.TeamSize,
            ProjectType = request.ProjectType,
            Schools = request.Schools,
            Companies = request.Companies,
            City = request.City,
            Country = request.Country,
            GithubUrl = request.GithubUrl,
            DemoUrl = request.DemoUrl,
            IsPublished = request.IsPublished,
            IsFeatured = request.IsFeatured,
            DisplayOrder = request.DisplayOrder,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _collection.InsertOneAsync(project);

        return project;
    }

    public async Task<bool> UpdateAsync(string id, ProjectUpdateRequest request)
    {
        Validate(request.Title, request.Description);

        if (!ObjectId.TryParse(id, out var objectId))
            return false;

        var update = Builders<Project>.Update
            .Set(p => p.Title, request.Title)
            .Set(p => p.Description, request.Description)
            .Set(p => p.Goal, request.Goal)
            .Set(p => p.Context, request.Context)
            .Set(p => p.Technologies, request.Technologies)
            .Set(p => p.Roles, request.Roles)
            .Set(p => p.Images, request.Images)
            .Set(p => p.Documents, request.Documents)
            .Set(p => p.ProjectType, request.ProjectType)
            .Set(p => p.Schools, request.Schools)
            .Set(p => p.Companies, request.Companies)
            .Set(p => p.City, request.City)
            .Set(p => p.Country, request.Country)
            .Set(p => p.StartDate, request.StartDate)
            .Set(p => p.EndDate, request.EndDate)
            .Set(p => p.TeamSize, request.TeamSize)
            .Set(p => p.GithubUrl, request.GithubUrl)
            .Set(p => p.DemoUrl, request.DemoUrl)
            .Set(p => p.IsPublished, request.IsPublished)
            .Set(p => p.IsFeatured, request.IsFeatured)
            .Set(p => p.DisplayOrder, request.DisplayOrder)
            .Set(p => p.UpdatedAt, DateTime.UtcNow);

        var result = await _collection.UpdateOneAsync(
            p => p.Id == objectId,
            update
        );

        return result.MatchedCount > 0;
    }

    public async Task<bool> DeleteAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
            return false;

        var result = await _collection.DeleteOneAsync(
            p => p.Id == objectId
        );

        return result.DeletedCount > 0;
    }

    private static void Validate(
        string title,
        string description)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Le titre est obligatoire.");

        if (string.IsNullOrWhiteSpace(description))
            throw new ArgumentException("La description est obligatoire.");

        if (title.Length > 120)
            throw new ArgumentException("Titre trop long.");
    }
}