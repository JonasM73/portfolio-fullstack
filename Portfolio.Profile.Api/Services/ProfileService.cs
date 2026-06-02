using MongoDB.Driver;
using Portfolio.Profile.Api.Dtos;
using Portfolio.Profile.Api.Models;

namespace Portfolio.Profile.Api.Services;

public class ProfileService
{
    private readonly IMongoCollection<UserProfile> _profiles;

    public ProfileService(IConfiguration configuration)
    {
        var connectionString = configuration["MongoDb:ConnectionString"];
        var databaseName = configuration["MongoDb:DatabaseName"];
        var collectionName = configuration["MongoDb:ProfilesCollection"] ?? "profiles";

        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(databaseName);

        _profiles = database.GetCollection<UserProfile>(collectionName);
    }

    public async Task<UserProfile?> GetPublicProfileAsync()
    {
        return await _profiles
            .Find(p => p.IsPublic)
            .FirstOrDefaultAsync();
    }

    public async Task<UserProfile?> GetByAuthUserIdAsync(string authUserId)
    {
        return await _profiles
            .Find(p => p.AuthUserId == authUserId)
            .FirstOrDefaultAsync();
    }

    public async Task<UserProfile> CreateEmptyProfileAsync(string authUserId, string email)
    {
        var existing = await GetByAuthUserIdAsync(authUserId);

        if (existing is not null)
            return existing;

        var profile = new UserProfile
        {
            AuthUserId = authUserId,
            Email = email,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _profiles.InsertOneAsync(profile);

        return profile;
    }
public async Task<bool> DeleteByAuthUserIdAsync(string authUserId)
{
    var result = await _profiles.DeleteOneAsync(p => p.AuthUserId == authUserId);

    return result.DeletedCount > 0;
}
    public async Task<UserProfile?> UpdateAsync(string authUserId, UpdateProfileRequest request)
    {
        var profile = await GetByAuthUserIdAsync(authUserId);

        if (profile is null)
            return null;

        profile.FirstName = request.FirstName;
        profile.LastName = request.LastName;
        profile.Headline = request.Headline;
        profile.Bio = request.Bio;
        profile.DateOfBirth = request.DateOfBirth;
        profile.City = request.City;
        profile.Country = request.Country;
        profile.Email = request.Email;
        profile.LinkedinUrl = request.LinkedinUrl;
        profile.GithubUrl = request.GithubUrl;
        profile.School = request.School;
        profile.WorkTitle = request.WorkTitle;
        profile.Company = request.Company;
        profile.GraduationYear = request.GraduationYear;

        profile.Interests = request.Interests
            .Select(i => new ProfileCard
            {
                Title = i.Title,
                Description = i.Description,
                Icon = i.Icon
            })
            .ToList();

        profile.Traits = request.Traits
            .Select(t => new ProfileCard
            {
                Title = t.Title,
                Description = t.Description,
                Icon = t.Icon
            })
            .ToList();

        profile.Timeline = request.Timeline
            .Select(t => new TimelineItem
            {
                Date = t.Date,
                Title = t.Title,
                Text = t.Text,
                IsCurrent = t.IsCurrent
            })
            .ToList();

        profile.UpdatedAt = DateTime.UtcNow;

        await _profiles.ReplaceOneAsync(p => p.AuthUserId == authUserId, profile);

        return profile;
    }
}