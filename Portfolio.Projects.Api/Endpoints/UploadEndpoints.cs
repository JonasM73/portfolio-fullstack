using Portfolio.Projects.Api.Models;

namespace Portfolio.Projects.Api.Endpoints;

public static class UploadEndpoints
{
    private const long MaxFileSize = 10 * 1024 * 1024;

    private static readonly string[] AllowedImageExtensions =
    [
        ".png", ".jpg", ".jpeg", ".webp"
    ];

    private static readonly string[] AllowedDocumentExtensions =
    [
        ".pdf", ".doc", ".docx", ".ppt", ".pptx"
    ];

    public static void MapUploadEndpoints(this WebApplication app)
    {
        app.MapPost("/api/uploads/projects", async (
            IFormFile file,
            IWebHostEnvironment env,
            HttpContext httpContext) =>
        {
            if (file.Length == 0)
                return Results.BadRequest("File is empty.");

            if (file.Length > MaxFileSize)
                return Results.BadRequest("File size must not exceed 10 MB.");

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var isImage = AllowedImageExtensions.Contains(extension);
            var isDocument = AllowedDocumentExtensions.Contains(extension);

            if (!isImage && !isDocument)
            {
                return Results.BadRequest(
                    "Invalid file type. Allowed: png, jpg, jpeg, webp, pdf, doc, docx, ppt, pptx."
                );
            }

            var folder = isImage ? "images" : "documents";

            var uploadRoot = Path.Combine(
                env.WebRootPath ?? Path.Combine(env.ContentRootPath, "wwwroot"),
                "uploads",
                "projects",
                folder
            );

            Directory.CreateDirectory(uploadRoot);

            var safeFileName =
                $"{Guid.NewGuid()}{extension}";

            var filePath = Path.Combine(uploadRoot, safeFileName);

            await using var stream = new FileStream(filePath, FileMode.Create);
            await file.CopyToAsync(stream);

            var request = httpContext.Request;

            var fileUrl =
                $"{request.Scheme}://{request.Host}/uploads/projects/{folder}/{safeFileName}";

            var uploadedFile = new ProjectFile
            {
                Url = fileUrl,
                FileName = file.FileName,
                FileType = isImage ? "image" : "document",
                Size = file.Length
            };

            return Results.Created(fileUrl, uploadedFile);
        })
        .DisableAntiforgery()
        .RequireAuthorization(policy => policy.RequireRole("Admin"));
    }
}