using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Portfolio.Projects.Api.Services;

public class AzureBlobStorageService
{
    private readonly BlobContainerClient _containerClient;

    public AzureBlobStorageService(IConfiguration configuration)
    {
        var connectionString = configuration["AzureBlobStorage:ConnectionString"];
        var containerName = configuration["AzureBlobStorage:ContainerName"];

        if (string.IsNullOrWhiteSpace(connectionString))
            throw new InvalidOperationException("Azure Blob Storage connection string is missing.");

        if (string.IsNullOrWhiteSpace(containerName))
            throw new InvalidOperationException("Azure Blob Storage container name is missing.");

        _containerClient = new BlobContainerClient(connectionString, containerName);
        _containerClient.CreateIfNotExists();
    }

    public async Task<string> UploadAsync(
        IFormFile file,
        string folder,
        string fileName,
        string contentType)
    {
        var blobName = $"projects/{folder}/{fileName}";
        var blobClient = _containerClient.GetBlobClient(blobName);

        await using var stream = file.OpenReadStream();

        await blobClient.UploadAsync(
            stream,
            new BlobHttpHeaders
            {
                ContentType = contentType
            }
        );

        return blobClient.Uri.ToString();
    }
}