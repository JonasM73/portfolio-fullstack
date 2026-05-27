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

    [BsonElement("technologies")]
    public string[] Technologies { get; set; } = [];

    [BsonElement("githubUrl")]
    public string? GithubUrl { get; set; }

    [BsonElement("demoUrl")]
    public string? DemoUrl { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}