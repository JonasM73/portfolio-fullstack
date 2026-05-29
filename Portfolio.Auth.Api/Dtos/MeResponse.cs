namespace Portfolio.Auth.Api.Dtos;

public record MeResponse(
    string Email,
    string FullName,
    string Role
);