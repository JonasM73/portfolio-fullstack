namespace Portfolio.Profile.Api.Middlewares;

public class InternalApiKeyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IConfiguration _configuration;

    public InternalApiKeyMiddleware(
        RequestDelegate next,
        IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value ?? "";

        var isInternalRoute =
            path.Equals("/api/profile/create", StringComparison.OrdinalIgnoreCase) ||
            (
                path.StartsWith("/api/profile/", StringComparison.OrdinalIgnoreCase) &&
                context.Request.Method == HttpMethods.Delete
            );

        if (!isInternalRoute)
        {
            await _next(context);
            return;
        }

        var configuredKey = _configuration["InternalApi:Key"];

        if (string.IsNullOrWhiteSpace(configuredKey))
        {
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            await context.Response.WriteAsync("Internal API key is missing.");
            return;
        }

        if (!context.Request.Headers.TryGetValue("X-Internal-Api-Key", out var providedKey) ||
            providedKey != configuredKey)
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsync("Unauthorized internal request.");
            return;
        }

        await _next(context);
    }
}