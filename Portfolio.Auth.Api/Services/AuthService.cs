using MongoDB.Driver;
using Portfolio.Auth.Api.Dtos;
using Portfolio.Auth.Api.Models;

namespace Portfolio.Auth.Api.Services;

public class AuthService
{
    private readonly IMongoCollection<AppUser> _users;
    private readonly JwtService _jwtService;

    public AuthService(IMongoDatabase database, JwtService jwtService)
    {
        _users = database.GetCollection<AppUser>("users");
        _jwtService = jwtService;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var admin = await _users
            .Find(x => x.Email == request.Email.ToLower())
            .FirstOrDefaultAsync();

        if (admin is null)
            return null;

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, admin.PasswordHash);

        if (!isPasswordValid)
            return null;

        var token = _jwtService.GenerateToken(admin);

        return new LoginResponse(
            token,
            admin.Email,
            admin.FullName,
            admin.Role,
            "2h"
        );
    }
    public async Task<bool> AdminExistsAsync()
    {
        return await _users.Find(x => x.Role == "Admin").AnyAsync();
    }

    public async Task<bool> CreateFirstAdminAsync(SetupAdminRequest request)
    {
        var adminExists = await AdminExistsAsync();

        if (adminExists)
            return false;

        var admin = new AppUser
        {
            Email = request.Email.ToLower(),
            FullName = request.FullName,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "Admin",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _users.InsertOneAsync(admin);

        return true;
    }
}