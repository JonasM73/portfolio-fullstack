namespace Portfolio.Auth.Api.Dtos;

public record SetupAdminRequest(
    string Email,
    string Password,
    string FullName
);