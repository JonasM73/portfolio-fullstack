namespace Portfolio.Auth.Api.Dtos;

public class ForgotPasswordRequest
{
    public string Email { get; set; } = string.Empty;
    public string? FrontendUrl { get; set; }
}