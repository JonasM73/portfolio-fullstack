namespace Portfolio.Projects.Api.Security;

public static class FileSignatureValidator
{
    private static readonly Dictionary<string, byte[][]> Signatures = new()
    {
        [".jpg"] = [[0xFF, 0xD8, 0xFF]],
        [".jpeg"] = [[0xFF, 0xD8, 0xFF]],
        [".png"] = [[0x89, 0x50, 0x4E, 0x47]],
        [".webp"] = [[0x52, 0x49, 0x46, 0x46]],
        [".pdf"] = [[0x25, 0x50, 0x44, 0x46]]
    };

    public static async Task<bool> IsValidAsync(IFormFile file, string[] allowedExtensions, string[] allowedMimeTypes)
    {
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();

        if (!allowedExtensions.Contains(extension))
            return false;

        if (!allowedMimeTypes.Contains(file.ContentType.ToLowerInvariant()))
            return false;

        if (!Signatures.TryGetValue(extension, out var signatures))
            return false;

        await using var stream = file.OpenReadStream();

        var maxSignatureLength = signatures.Max(s => s.Length);
        var buffer = new byte[maxSignatureLength];

        var bytesRead = await stream.ReadAsync(buffer);

        if (bytesRead < maxSignatureLength)
            return false;

        return signatures.Any(signature =>
            buffer.Take(signature.Length).SequenceEqual(signature)
        );
    }
}