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