namespace Portfolio.Auth.Api.Dtos;

public record LoginResponse(
    string Token,
    string Email,
    string FullName,
    string Role,
    string ExpiresIn
);