namespace Portfolio.Contact.Api.Dtos;

public class ContactCreateRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;

    public string? ProjectId { get; set; }
    public string? ProjectTitle { get; set; }
}