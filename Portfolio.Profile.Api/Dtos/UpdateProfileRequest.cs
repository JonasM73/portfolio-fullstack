namespace Portfolio.Profile.Api.Dtos;

public class UpdateProfileRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Headline { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public DateTime? DateOfBirth { get; set; }

    public string City { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public string? LinkedinUrl { get; set; }
    public string? GithubUrl { get; set; }

    public string? School { get; set; }
    public string? WorkTitle { get; set; }
    public string? Company { get; set; }
    public int? GraduationYear { get; set; }

    public List<ProfileCardDto> Interests { get; set; } = [];
    public List<ProfileCardDto> Traits { get; set; } = [];
    public List<TimelineItemDto> Timeline { get; set; } = [];
    public List<EducationItemDto> Education { get; set; } = [];
    public List<LicenseItemDto> Licenses { get; set; } = [];
    public List<LanguageItemDto> Languages { get; set; } = [];
    public List<CertificationItemDto> Certifications { get; set; } = [];
    public List<SkillItemDto> Skills { get; set; } = [];
}
public class EducationItemDto
{
    public string School { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Field { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string StartYear { get; set; } = string.Empty;
    public string? EndYear { get; set; }
    public string Status { get; set; } = "in_progress";
    public string? Description { get; set; }
}

public class LicenseItemDto
{
    public string Name { get; set; } = string.Empty;
    public string Status { get; set; } = "obtained";
    public string? ObtainedYear { get; set; }
}

public class LanguageItemDto
{
    public string Name { get; set; } = string.Empty;
    public string Level { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class CertificationItemDto
{
    public string Name { get; set; } = string.Empty;
    public string? Organization { get; set; }
    public string? Year { get; set; }
    public string? Url { get; set; }
}

public class SkillItemDto
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public int Level { get; set; } = 3;
}
public class ProfileCardDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Icon { get; set; }
}

public class TimelineItemDto
{
    public string Date { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public bool IsCurrent { get; set; }
}

public class CreateProfileRequest
{
    public string AuthUserId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}