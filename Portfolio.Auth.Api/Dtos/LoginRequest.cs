namespace Portfolio.Auth.Api.Dtos;

public record LoginRequest(
    string Email,
    string Password
);