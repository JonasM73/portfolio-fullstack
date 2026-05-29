namespace Portfolio.Auth.Api.Dtos;

public record ChangePasswordRequest(
    string CurrentPassword,
    string NewPassword
);