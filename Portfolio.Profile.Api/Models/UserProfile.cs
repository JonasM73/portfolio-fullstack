using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Profile.Api.Models;

public class UserProfile
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("authUserId")]
    public string AuthUserId { get; set; } = string.Empty;

    [BsonElement("firstName")]
    public string FirstName { get; set; } = string.Empty;

    [BsonElement("lastName")]
    public string LastName { get; set; } = string.Empty;

    [BsonElement("headline")]
    public string Headline { get; set; } = string.Empty;

    [BsonElement("bio")]
    public string Bio { get; set; } = string.Empty;

    [BsonElement("dateOfBirth")]
    public DateTime? DateOfBirth { get; set; }

    [BsonElement("city")]
    public string City { get; set; } = string.Empty;

    [BsonElement("country")]
    public string Country { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("linkedinUrl")]
    public string? LinkedinUrl { get; set; }

    [BsonElement("githubUrl")]
    public string? GithubUrl { get; set; }

    [BsonElement("school")]
    public string? School { get; set; }

    [BsonElement("workTitle")]
    public string? WorkTitle { get; set; }

    [BsonElement("company")]
    public string? Company { get; set; }

    [BsonElement("graduationYear")]
    public int? GraduationYear { get; set; }

    [BsonElement("interests")]
    public List<ProfileCard> Interests { get; set; } = [];

    [BsonElement("traits")]
    public List<ProfileCard> Traits { get; set; } = [];

    [BsonElement("timeline")]
    public List<TimelineItem> Timeline { get; set; } = [];

    [BsonElement("isPublic")]
    public bool IsPublic { get; set; } = true;

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

public class ProfileCard
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
}

public class TimelineItem
{
    public string Date { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public bool IsCurrent { get; set; }
}