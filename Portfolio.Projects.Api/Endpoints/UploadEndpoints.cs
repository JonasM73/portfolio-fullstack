using Portfolio.Projects.Api.Models;
using Portfolio.Projects.Api.Services;

namespace Portfolio.Projects.Api.Endpoints;

public static class UploadEndpoints
{
    private const long MaxImageSize = 10 * 1024 * 1024;
    private const long MaxDocumentSize = 50 * 1024 * 1024;

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
            AzureBlobStorageService blobStorageService) =>
        {
            if (file.Length == 0)
                return Results.BadRequest("Le fichier est vide.");

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

            var isImage = AllowedImageExtensions.Contains(extension);
            var isDocument = AllowedDocumentExtensions.Contains(extension);

            if (!isImage && !isDocument)
            {
                return Results.BadRequest(
                    "Format invalide. Formats autorisés : png, jpg, jpeg, webp, pdf, doc, docx, ppt, pptx."
                );
            }

            if (isImage && file.Length > MaxImageSize)
                return Results.BadRequest("L'image ne doit pas dépasser 10 Mo.");

            if (isDocument && file.Length > MaxDocumentSize)
                return Results.BadRequest("Le document ne doit pas dépasser 50 Mo.");

            var folder = isImage ? "images" : "documents";
            var safeFileName = $"{Guid.NewGuid()}{extension}";

            var fileUrl = await blobStorageService.UploadAsync(
                file,
                folder,
                safeFileName,
                file.ContentType
            );

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