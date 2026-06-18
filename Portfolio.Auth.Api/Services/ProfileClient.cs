using System.Net.Http.Json;

namespace Portfolio.Auth.Api.Services;

public class ProfileClient
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public ProfileClient(
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task CreateProfileAsync(
        string authUserId,
        string email)
    {
        var internalApiKey = _configuration["InternalApi:Key"];

        if (string.IsNullOrWhiteSpace(internalApiKey))
            throw new InvalidOperationException("Internal API key is missing.");

        var client = _httpClientFactory.CreateClient("ProfileApi");

        var request = new HttpRequestMessage(
            HttpMethod.Post,
            "/api/profile/create"
        );

        request.Headers.Add("X-Internal-Api-Key", internalApiKey);

        request.Content = JsonContent.Create(new
        {
            authUserId,
            email
        });

        var response = await client.SendAsync(request);

        response.EnsureSuccessStatusCode();
    }

    public async Task DeleteProfileAsync(string authUserId)
    {
        var internalApiKey = _configuration["InternalApi:Key"];

        if (string.IsNullOrWhiteSpace(internalApiKey))
            throw new InvalidOperationException("Internal API key is missing.");

        var client = _httpClientFactory.CreateClient("ProfileApi");

        var request = new HttpRequestMessage(
            HttpMethod.Delete,
            $"/api/profile/{authUserId}"
        );

        request.Headers.Add("X-Internal-Api-Key", internalApiKey);

        var response = await client.SendAsync(request);

        if (!response.IsSuccessStatusCode &&
            response.StatusCode != System.Net.HttpStatusCode.NotFound)
        {
            response.EnsureSuccessStatusCode();
        }
    }
}