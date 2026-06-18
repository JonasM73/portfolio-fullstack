using MongoDB.Driver;
using Portfolio.Auth.Api.Dtos;
using Portfolio.Auth.Api.Models;
using System.Security.Cryptography;
using System.Text;
using MongoDB.Bson;

namespace Portfolio.Auth.Api.Services;

public class AuthService
{
    private readonly IMongoCollection<AppUser> _users;
    private readonly JwtService _jwtService;
    private readonly PasswordPolicyService _passwordPolicy;
    private readonly RefreshTokenService _refreshTokenService;
    public AuthService(
        IMongoDatabase database,
        JwtService jwtService,
        PasswordPolicyService passwordPolicy,
        RefreshTokenService refreshTokenService)
    {
        _users = database.GetCollection<AppUser>("users");
        _jwtService = jwtService;
        _passwordPolicy = passwordPolicy;
        _refreshTokenService = refreshTokenService;
    }

    public async Task<bool> AdminExistsAsync()
    {
        return await _users.Find(x => x.Role == UserRole.Admin.ToString()).AnyAsync();
    }
    
    public async Task<(bool Success, string Message, string? Token)> ForgotPasswordAsync(
        ForgotPasswordRequest request)
    {
        var email = request.Email.ToLower();

        var user = await _users
            .Find(x => x.Email == email)
            .FirstOrDefaultAsync();

        if (user is null)
        {
            return (true, "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.", null);
        }

        var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));

        var tokenHash = HashToken(token);

        var update = Builders<AppUser>.Update
            .Set(x => x.PasswordResetTokenHash, tokenHash)
            .Set(x => x.PasswordResetTokenExpiresAt, DateTime.UtcNow.AddMinutes(30))
            .Set(x => x.UpdatedAt, DateTime.UtcNow);

        await _users.UpdateOneAsync(x => x.Id == user.Id, update);

        return (
            true,
            "Si un compte existe avec cet email, un lien de réinitialisation a été envoyé.",
            token
        );
    }

    public async Task<(bool Success, string Message)> ResetPasswordAsync(
        ResetPasswordRequest request)
    {
        var email = request.Email.ToLower();

        var user = await _users
            .Find(x => x.Email == email)
            .FirstOrDefaultAsync();

        if (user is null)
            return (false, "Lien de réinitialisation invalide ou expiré.");

        if (string.IsNullOrWhiteSpace(user.PasswordResetTokenHash))
            return (false, "Lien de réinitialisation invalide ou expiré.");

        if (user.PasswordResetTokenExpiresAt is null ||
            user.PasswordResetTokenExpiresAt < DateTime.UtcNow)
            return (false, "Lien de réinitialisation expiré.");

        var tokenHash = HashToken(request.Token);

        if (tokenHash != user.PasswordResetTokenHash)
            return (false, "Lien de réinitialisation invalide ou expiré.");

        if (!_passwordPolicy.IsValid(request.NewPassword, out var error))
            return (false, error);

        var update = Builders<AppUser>.Update
            .Set(x => x.PasswordHash, BCrypt.Net.BCrypt.HashPassword(request.NewPassword))
            .Unset(x => x.PasswordResetTokenHash)
            .Unset(x => x.PasswordResetTokenExpiresAt)
            .Set(x => x.UpdatedAt, DateTime.UtcNow);

        await _users.UpdateOneAsync(x => x.Id == user.Id, update);

        return (true, "Mot de passe réinitialisé avec succès.");
    }

    private static string HashToken(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToHexString(bytes);
    }
    public async Task<(bool Success, string Message)> CreateFirstAdminAsync(SetupAdminRequest request)
    {
        var adminExists = await AdminExistsAsync();

        if (adminExists)
            return (false, "Un administrateur existe déjà.");

        if (!_passwordPolicy.IsValid(request.Password, out var error))
            return (false, error);

        var email = request.Email.ToLower();

        var admin = new AppUser
        {
            Email = email,
            FullName = request.FullName,
            Role = UserRole.Admin.ToString(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _users.InsertOneAsync(admin);

        return (true, "Administrateur créé avec succès.");
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var email = request.Email.ToLower();

        var user = await _users.Find(x => x.Email == email).FirstOrDefaultAsync();

        if (user is null)
            return null;

        if (user.LockoutEnd.HasValue &&
            user.LockoutEnd > DateTime.UtcNow)
        {
            throw new Exception(
                "Compte temporairement bloqué pendant 15 minutes."
            );
        }

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

        if (!isPasswordValid)
        {
            var failedAttempts = user.FailedLoginAttempts + 1;

            var update = failedAttempts >= 5
                ? Builders<AppUser>.Update
                    .Set(x => x.FailedLoginAttempts, 0)
                    .Set(x => x.LockoutEnd, DateTime.UtcNow.AddMinutes(15))
                    .Set(x => x.UpdatedAt, DateTime.UtcNow)
                : Builders<AppUser>.Update
                    .Set(x => x.FailedLoginAttempts, failedAttempts)
                    .Set(x => x.UpdatedAt, DateTime.UtcNow);

            await _users.UpdateOneAsync(x => x.Id == user.Id, update);

            return null;
        }

        var resetUpdate = Builders<AppUser>.Update
            .Set(x => x.FailedLoginAttempts, 0)
            .Unset(x => x.LockoutEnd)
            .Set(x => x.UpdatedAt, DateTime.UtcNow);

        await _users.UpdateOneAsync(x => x.Id == user.Id, resetUpdate);

        var token = _jwtService.GenerateToken(user);

        var refreshToken = _refreshTokenService.Generate();
        var refreshTokenHash = _refreshTokenService.Hash(refreshToken);

        var newRefreshToken = new RefreshToken
        {
            TokenHash = refreshTokenHash,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            CreatedAt = DateTime.UtcNow
        };

        var refreshUpdate = Builders<AppUser>.Update
            .Push(x => x.RefreshTokens, newRefreshToken)
            .Set(x => x.UpdatedAt, DateTime.UtcNow);

        await _users.UpdateOneAsync(x => x.Id == user.Id, refreshUpdate);

        return new LoginResponse(
            token,
            refreshToken,
            user.Email,
            user.FullName,
            user.Role,
            "30m"
        );
    }

    public async Task<List<AppUser>> GetUsersAsync()
    {
        return await _users.Find(_ => true).ToListAsync();
    }

    public async Task<AppUser?> GetUserByIdAsync(string id)
    {
        if (!ObjectId.TryParse(id, out var objectId))
            return null;

        return await _users
            .Find(x => x.Id == objectId)
            .FirstOrDefaultAsync();
    }

    public async Task<(bool Success, string Message)> CreateUserAsync(CreateUserRequest request)
    {
        if (!Enum.TryParse<UserRole>(request.Role, true, out var role))
            return (false, "Rôle invalide. Valeurs acceptées : Admin, User, Premium.");

        if (!_passwordPolicy.IsValid(request.Password, out var error))
            return (false, error);

        var email = request.Email.ToLower();

        var exists = await _users.Find(x => x.Email == email).AnyAsync();

        if (exists)
            return (false, "Un utilisateur avec cet email existe déjà.");

        var user = new AppUser
        {
            Email = email,
            FullName = request.FullName,
            Role = role.ToString(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _users.InsertOneAsync(user);

        return (true, "Utilisateur créé avec succès.");
    }

    public async Task<(bool Success, string Message)> UpdateUserAsync(string id, UpdateUserRequest request)
    {
        if (!Enum.TryParse<UserRole>(request.Role, true, out var role))
            return (false, "Rôle invalide. Valeurs acceptées : Admin, User, Premium.");

        var user = await GetUserByIdAsync(id);

        if (user is null)
            return (false, "Utilisateur introuvable.");

        if (user.Role == UserRole.Admin.ToString() && role != UserRole.Admin)
        {
            var adminCount = await _users.CountDocumentsAsync(x => x.Role == UserRole.Admin.ToString());

            if (adminCount <= 1)
                return (false, "Impossible de retirer le rôle du dernier administrateur.");
        }

        var update = Builders<AppUser>.Update
            .Set(x => x.FullName, request.FullName)
            .Set(x => x.Role, role.ToString())
            .Set(x => x.UpdatedAt, DateTime.UtcNow);
            
        if (!ObjectId.TryParse(id, out var objectId))
            return (false, "Utilisateur introuvable.");
        await _users.UpdateOneAsync(x => x.Id == objectId, update);

        return (true, "Utilisateur modifié avec succès.");
    }

    public async Task<(bool Success, string Message)> DeleteUserAsync(string id)
    {
        var user = await GetUserByIdAsync(id);

        if (user is null)
            return (false, "Utilisateur introuvable.");

        if (user.Role == UserRole.Admin.ToString())
        {
            var adminCount = await _users.CountDocumentsAsync(x => x.Role == UserRole.Admin.ToString());

            if (adminCount <= 1)
                return (false, "Impossible de supprimer le dernier administrateur.");
        }
        if (!ObjectId.TryParse(id, out var objectId))
            return (false, "Utilisateur introuvable.");
        await _users.DeleteOneAsync(x => x.Id == objectId  );

        return (true, "Utilisateur supprimé avec succès.");
    }

    public async Task<(bool Success, string Message)> DeleteOwnAccountAsync(string userId)
    {
        var user = await GetUserByIdAsync(userId);

        if (user is null)
            return (false, "Utilisateur introuvable.");

        if (user.Role == UserRole.Admin.ToString())
            return (false, "Un administrateur ne peut pas supprimer son propre compte depuis cette route.");
            
        if (!ObjectId.TryParse(userId, out var objectId))
            return (false, "Utilisateur introuvable.");
        await _users.DeleteOneAsync(x => x.Id == objectId);

        return (true, "Compte supprimé avec succès.");
    }
    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        var normalizedEmail = email.ToLower();

        return await _users
            .Find(x => x.Email == normalizedEmail)
            .FirstOrDefaultAsync();
    }
    public async Task<(bool Success, string Message)> ChangePasswordAsync(
        string userId,
        ChangePasswordRequest request)
    {
        var user = await GetUserByIdAsync(userId);

        if (user is null)
            return (false, "Utilisateur introuvable.");

        if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
            return (false, "Mot de passe actuel incorrect.");

        if (!_passwordPolicy.IsValid(request.NewPassword, out var error))
            return (false, error);
        var now = DateTime.UtcNow;

        user.RefreshTokens.ForEach(t =>
        {
            if (t.IsActive)
                t.RevokedAt = now;
        });
        var update = Builders<AppUser>.Update
            .Set(x => x.PasswordHash, BCrypt.Net.BCrypt.HashPassword(request.NewPassword))
            .Set(x => x.RefreshTokens, user.RefreshTokens)
            .Set(x => x.UpdatedAt, now);

        if (!ObjectId.TryParse(userId, out var objectId))
            return (false, "Utilisateur introuvable.");
        await _users.UpdateOneAsync(x => x.Id == objectId, update);

        return (true, "Mot de passe modifié avec succès.");
    }
    public async Task<LoginResponse?> RefreshAsync(string refreshToken)
{
    var refreshTokenHash = _refreshTokenService.Hash(refreshToken);

    var user = await _users
        .Find(x => x.RefreshTokens.Any(t => t.TokenHash == refreshTokenHash))
        .FirstOrDefaultAsync();

    if (user is null)
        return null;

    var storedToken = user.RefreshTokens
        .FirstOrDefault(t => t.TokenHash == refreshTokenHash);

    if (storedToken is null || !storedToken.IsActive)
        return null;

    storedToken.RevokedAt = DateTime.UtcNow;

    var newRefreshToken = _refreshTokenService.Generate();

    user.RefreshTokens.Add(new RefreshToken
    {
        TokenHash = _refreshTokenService.Hash(newRefreshToken),
        ExpiresAt = DateTime.UtcNow.AddDays(7),
        CreatedAt = DateTime.UtcNow
    });

    await _users.UpdateOneAsync(
        x => x.Id == user.Id,
        Builders<AppUser>.Update
            .Set(x => x.RefreshTokens, user.RefreshTokens)
            .Set(x => x.UpdatedAt, DateTime.UtcNow)
    );

    var accessToken = _jwtService.GenerateToken(user);

    return new LoginResponse(
        accessToken,
        newRefreshToken,
        user.Email,
        user.FullName,
        user.Role,
        "30m"
    );
}

public async Task<bool> LogoutAsync(string refreshToken)
{
    var refreshTokenHash = _refreshTokenService.Hash(refreshToken);

    var user = await _users
        .Find(x => x.RefreshTokens.Any(t => t.TokenHash == refreshTokenHash))
        .FirstOrDefaultAsync();

    if (user is null)
        return true;

    var storedToken = user.RefreshTokens
        .FirstOrDefault(t => t.TokenHash == refreshTokenHash);

    if (storedToken is not null && storedToken.IsActive)
        storedToken.RevokedAt = DateTime.UtcNow;

    await _users.UpdateOneAsync(
        x => x.Id == user.Id,
        Builders<AppUser>.Update
            .Set(x => x.RefreshTokens, user.RefreshTokens)
            .Set(x => x.UpdatedAt, DateTime.UtcNow)
    );

    return true;
}
}