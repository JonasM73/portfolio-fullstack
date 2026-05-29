namespace Portfolio.Auth.Api.Dtos;

public record UpdateUserRequest(
    string FullName,
    string Role
);