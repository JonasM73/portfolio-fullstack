using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Profile.Api.Dtos;
using Portfolio.Profile.Api.Services;
using Portfolio.Profile.Api.Models;
using Portfolio.Profile.Api.Security;

namespace Portfolio.Profile.Api.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _profileService;
    private readonly ProfileBlobStorageService _blobStorageService;

    public ProfileController(
        ProfileService profileService,
        ProfileBlobStorageService blobStorageService)
    {
        _profileService = profileService;
        _blobStorageService = blobStorageService;
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("me/avatar")]
    public async Task<IActionResult> UploadAvatar(IFormFile file)
    {
        var authUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(authUserId))
            return Unauthorized();

        if (file is null || file.Length == 0)
            return BadRequest(new { message = "Aucun fichier envoyé." });

        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".webp" };

        var allowedMimeTypes = new[]
        {
            "image/jpeg",
            "image/png",
            "image/webp"
        };

        var isValidFile = await FileSignatureValidator.IsValidAsync(
            file,
            allowedExtensions,
            allowedMimeTypes
        );

        if (!isValidFile)
        {
            return BadRequest("Type de fichier invalide.");
        }

        var avatar = await _blobStorageService.UploadAvatarAsync(
            file,
            authUserId
        );

        var profile = await _profileService.UpdateAvatarAsync(
            authUserId,
            avatar
        );

        if (profile is null)
            return NotFound(new { message = "Profil introuvable." });

        return Ok(profile.Avatar);
    }
    [Authorize(Roles = "Admin")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateProfile(CreateProfileRequest request)
    {
        var profile = await _profileService.CreateEmptyProfileAsync(
            request.AuthUserId,
            request.Email
        );

        return Ok(profile);
    }
    [Authorize(Roles = "Admin")]
    [HttpDelete("{authUserId}")]
public async Task<IActionResult> DeleteProfile(string authUserId)
{
    var deleted = await _profileService.DeleteByAuthUserIdAsync(authUserId);

    if (!deleted)
        return NotFound(new { message = "Profil introuvable." });

    return Ok(new { message = "Profil supprimé." });
}

    [HttpGet("public")]
    public async Task<IActionResult> GetPublicProfile()
    {
        var profile = await _profileService.GetPublicProfileAsync();

        if (profile is null)
            return NotFound("Aucun profil public trouvé.");

        return Ok(profile);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetMyProfile()
    {
        var authUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(authUserId))
            return Unauthorized();

        var profile = await _profileService.GetByAuthUserIdAsync(authUserId);

        if (profile is null)
            return NotFound("Profil introuvable.");

        return Ok(profile);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateMyProfile(UpdateProfileRequest request)
    {
        var authUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(authUserId))
            return Unauthorized();

        var profile = await _profileService.UpdateAsync(authUserId, request);

        if (profile is null)
            return NotFound("Profil introuvable.");

        return Ok(profile);
    }
    
}