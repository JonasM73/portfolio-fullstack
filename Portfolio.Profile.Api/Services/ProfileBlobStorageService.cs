using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Portfolio.Profile.Api.Models;

namespace Portfolio.Profile.Api.Services;

public class ProfileBlobStorageService
{
    private readonly BlobContainerClient _containerClient;

    public ProfileBlobStorageService(IConfiguration configuration)
    {
        var connectionString = configuration["AzureBlobStorage:ConnectionString"];
        var containerName = configuration["AzureBlobStorage:ContainerName"] ?? "portfolio-projects";

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Azure Blob Storage connection string is missing.");

        _containerClient = new BlobContainerClient(connectionString, containerName);
        _containerClient.CreateIfNotExists(PublicAccessType.Blob);
    }

    public async Task<ProfileFile> UploadAvatarAsync(IFormFile file, string authUserId)
    {
        var extension = Path.GetExtension(file.FileName);
        var fileName = $"profiles/{authUserId}/avatar-{Guid.NewGuid()}{extension}";

        var blobClient = _containerClient.GetBlobClient(fileName);

        await using var stream = file.OpenReadStream();

        await blobClient.UploadAsync(
            stream,
            new BlobHttpHeaders
            {
                ContentType = file.ContentType
            }
        );

        return new ProfileFile
        {
            Url = blobClient.Uri.ToString(),
            FileName = file.FileName,
            FileType = file.ContentType,
            Size = file.Length
        };
    }
}