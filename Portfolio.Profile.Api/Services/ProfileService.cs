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
        profile.Education = request.Education
            .Select(e => new EducationItem
            {
                School = e.School,
                Degree = e.Degree,
                Field = e.Field,
                Level = e.Level,
                StartYear = e.StartYear,
                EndYear = e.EndYear,
                Status = e.Status,
                Description = e.Description
            })
            .ToList();

        profile.Licenses = request.Licenses
            .Select(l => new LicenseItem
            {
                Name = l.Name,
                Status = l.Status,
                ObtainedYear = l.ObtainedYear
            })
            .ToList();

        profile.Languages = request.Languages
            .Select(l => new LanguageItem
            {
                Name = l.Name,
                Level = l.Level,
                Description = l.Description
            })
            .ToList();

        profile.Certifications = request.Certifications
            .Select(c => new CertificationItem
            {
                Name = c.Name,
                Organization = c.Organization,
                Year = c.Year,
                Url = c.Url
            })
            .ToList();

        profile.Skills = request.Skills
            .Select(s => new SkillItem
            {
                Name = s.Name,
                Category = s.Category,
                Level = s.Level
            })
            .ToList();
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