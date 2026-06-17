using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Auth.Api.Models;

public class RefreshToken
{
    [BsonElement("tokenHash")]
    public string TokenHash { get; set; } = string.Empty;

    [BsonElement("expiresAt")]
    public DateTime ExpiresAt { get; set; }

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [BsonElement("revokedAt")]
    public DateTime? RevokedAt { get; set; }

    [BsonIgnore]
    public bool IsExpired => DateTime.UtcNow >= ExpiresAt;

    [BsonIgnore]
    public bool IsRevoked => RevokedAt is not null;

    [BsonIgnore]
    public bool IsActive => !IsExpired && !IsRevoked;
}