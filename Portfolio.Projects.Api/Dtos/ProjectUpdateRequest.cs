namespace Portfolio.Projects.Api.Dtos;

public class ProjectUpdateRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string[] Technologies { get; set; } = [];

    public string? GithubUrl { get; set; }

    public string? DemoUrl { get; set; }
}