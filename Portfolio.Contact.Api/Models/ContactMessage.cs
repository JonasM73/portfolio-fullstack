using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Contact.Api.Models;

public class ContactMessage
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;

    public string? ProjectId { get; set; }
    public string? ProjectTitle { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}