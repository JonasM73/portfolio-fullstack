namespace Portfolio.Auth.Api.Dtos;

public record CreateUserRequest(
    string Email,
    string Password,
    string FullName,
    string Role
);