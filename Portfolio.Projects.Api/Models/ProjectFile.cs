namespace Portfolio.Projects.Api.Models;

public class ProjectFile
{
    public string Url { get; set; } = string.Empty;

    public string FileName { get; set; } = string.Empty;

    public string FileType { get; set; } = string.Empty;

    public long Size { get; set; }
}