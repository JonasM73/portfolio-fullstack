using System.Security.Cryptography;
using System.Text;

namespace Portfolio.Auth.Api.Services;

public class RefreshTokenService
{
    public string Generate()
    {
        var bytes = RandomNumberGenerator.GetBytes(64);
        return Convert.ToBase64String(bytes);
    }

    public string Hash(string token)
    {
        var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(token));
        return Convert.ToBase64String(bytes);
    }
}