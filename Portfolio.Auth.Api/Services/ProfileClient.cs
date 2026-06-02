using System.Net.Http.Json;

namespace Portfolio.Auth.Api.Services;

public class ProfileClient
{
    private readonly IHttpClientFactory _httpClientFactory;

    public ProfileClient(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task CreateProfileAsync(
        string authUserId,
        string email)
    {
        var client =
            _httpClientFactory.CreateClient("ProfileApi");

        var response =
            await client.PostAsJsonAsync(
                "/api/profile/create",
                new
                {
                    authUserId,
                    email
                });

        response.EnsureSuccessStatusCode();
    }
public async Task DeleteProfileAsync(string authUserId)
{
    var client = _httpClientFactory.CreateClient("ProfileApi");

    var response = await client.DeleteAsync($"/api/profile/{authUserId}");

    if (!response.IsSuccessStatusCode &&
        response.StatusCode != System.Net.HttpStatusCode.NotFound)
    {
        response.EnsureSuccessStatusCode();
    }
}
}