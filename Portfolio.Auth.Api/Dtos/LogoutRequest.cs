namespace Portfolio.Auth.Api.Dtos;

public class LogoutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}