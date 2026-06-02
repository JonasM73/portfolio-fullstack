using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Projects.Api.Models;

public class Project
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = string.Empty;

    [BsonElement("description")]
    public string Description { get; set; } = string.Empty;

    [BsonElement("goal")]
    public string? Goal { get; set; }

    [BsonElement("context")]
    public string? Context { get; set; }

    [BsonElement("technologies")]
    public string[] Technologies { get; set; } = [];

    [BsonElement("roles")]
    public string[] Roles { get; set; } = [];

    [BsonElement("images")]
    public ProjectFile[] Images { get; set; } = [];

    [BsonElement("documents")]
    public ProjectFile[] Documents { get; set; } = [];

    [BsonElement("projectType")]
    public string ProjectType { get; set; } = "other";

    [BsonElement("schools")]
    public string[] Schools { get; set; } = [];

    [BsonElement("companies")]
    public string[] Companies { get; set; } = [];

    [BsonElement("city")]
    public string? City { get; set; }

    [BsonElement("country")]
    public string? Country { get; set; }

    [BsonElement("startDate")]
    public DateTime? StartDate { get; set; }

    [BsonElement("endDate")]
    public DateTime? EndDate { get; set; }

    [BsonElement("teamSize")]
    public int? TeamSize { get; set; }

    [BsonElement("githubUrl")]
    public string? GithubUrl { get; set; }

    [BsonElement("demoUrl")]
    public string? DemoUrl { get; set; }

    [BsonElement("isPublished")]
    public bool IsPublished { get; set; } = false;

    [BsonElement("isFeatured")]
    public bool IsFeatured { get; set; } = false;

    [BsonElement("displayOrder")]
    public int DisplayOrder { get; set; } = 999;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}