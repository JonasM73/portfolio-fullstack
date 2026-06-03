using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace Portfolio.Auth.Api.Services;

public class AuthEmailService
{
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthEmailService(
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    public async Task SendPasswordResetEmailAsync(
        string email,
        string token)
    {
        var apiKey = _configuration["Resend:ApiKey"];
        var from = _configuration["Resend:From"];
        if (string.IsNullOrWhiteSpace(from))
            throw new InvalidOperationException("Resend sender is missing.");
        var frontendUrl = _configuration["Frontend:Url"];

        if (string.IsNullOrWhiteSpace(apiKey))
            throw new InvalidOperationException("Resend API key is missing.");

        var resetLink = !string.IsNullOrWhiteSpace(frontendUrl)
            ? $"{frontendUrl}/admin/reset-password?email={Uri.EscapeDataString(email)}&token={Uri.EscapeDataString(token)}"
            : null;

        var client = _httpClientFactory.CreateClient();

        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", apiKey);

        var payload = new
        {
            from,
            to = email,
            subject = "Réinitialisation de votre mot de passe",
            html = $"""
            <h2>Réinitialisation du mot de passe</h2>
            <p>Vous avez demandé à réinitialiser votre mot de passe.</p>
            <p>Ce code est valable 30 minutes :</p>
            <div style="padding:16px;border-radius:12px;background:#f4f4f5;font-size:14px;font-weight:bold;word-break:break-all;">
                {token}
            </div>
            <p>Email associé :</p>
            <div style="padding:12px;border-radius:12px;background:#f4f4f5;font-size:14px;font-weight:bold;">
                {email}
            </div>
            {(resetLink is not null
                ? $"""<p><a href="{resetLink}">Réinitialiser mon mot de passe</a></p>"""
                : "<p>Ouvrez la page de réinitialisation depuis votre application, puis copiez ce code.</p>"
            )}
            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez cet email.</p>
            """
        };

        var response = await client.PostAsJsonAsync(
            "https://api.resend.com/emails",
            payload
        );

        response.EnsureSuccessStatusCode();
    }
}