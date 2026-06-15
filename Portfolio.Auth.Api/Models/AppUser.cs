using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Auth.Api.Models;

public class AppUser
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; } = string.Empty;

    [BsonElement("fullName")]
    public string FullName { get; set; } = string.Empty;

    [BsonElement("role")]
    public string Role { get; set; } = UserRole.User.ToString();
    
    [BsonElement("passwordResetTokenHash")]
    public string? PasswordResetTokenHash { get; set; }

    [BsonElement("passwordResetTokenExpiresAt")]
    public DateTime? PasswordResetTokenExpiresAt { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("updatedAt")]
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    
    [BsonElement("failedLoginAttempts")]
    public int FailedLoginAttempts { get; set; }

    [BsonElement("lockoutEnd")]
    public DateTime? LockoutEnd { get; set; }
}