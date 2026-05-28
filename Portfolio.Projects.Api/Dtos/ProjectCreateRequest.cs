using Portfolio.Projects.Api.Models;

namespace Portfolio.Projects.Api.Dtos;

public class ProjectCreateRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string? Goal { get; set; }
    public string? Context { get; set; }

    public string[] Technologies { get; set; } = [];
    public string[] Roles { get; set; } = [];

    public ProjectFile[] Images { get; set; } = [];
    public ProjectFile[] Documents { get; set; } = [];

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    public int? TeamSize { get; set; }

    public string ProjectType { get; set; } = "other";

    public string[] Schools { get; set; } = [];

    public string[] Companies { get; set; } = [];

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? GithubUrl { get; set; }
    public string? DemoUrl { get; set; }
}