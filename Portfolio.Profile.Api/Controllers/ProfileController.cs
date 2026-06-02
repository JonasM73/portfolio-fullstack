using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Profile.Api.Dtos;
using Portfolio.Profile.Api.Services;

namespace Portfolio.Profile.Api.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
    private readonly ProfileService _profileService;

    public ProfileController(ProfileService profileService)
    {
        _profileService = profileService;
    }
    [HttpPost("create")]
    public async Task<IActionResult> CreateProfile(CreateProfileRequest request)
    {
        var profile = await _profileService.CreateEmptyProfileAsync(
            request.AuthUserId,
            request.Email
        );

        return Ok(profile);
    }
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

    [Authorize]
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