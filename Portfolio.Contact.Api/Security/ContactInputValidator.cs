using System.Net;
using System.Text.RegularExpressions;
using Portfolio.Contact.Api.Dtos;

namespace Portfolio.Contact.Api.Security;

public static class ContactInputValidator
{
    private static readonly Regex EmailRegex = new(
        @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase
    );

    public static string? Validate(ContactCreateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length > 100)
            return "Nom invalide.";

        if (string.IsNullOrWhiteSpace(request.Email) || request.Email.Length > 150 || !EmailRegex.IsMatch(request.Email))
            return "Email invalide.";

        if (string.IsNullOrWhiteSpace(request.Subject) || request.Subject.Length > 150)
            return "Sujet invalide.";

        if (string.IsNullOrWhiteSpace(request.Message) || request.Message.Length > 3000)
            return "Message invalide.";

        if (ContainsDangerousHtml(request.Message) ||
            ContainsDangerousHtml(request.Name) ||
            ContainsDangerousHtml(request.Subject))
        {
            return "Contenu invalide.";
        }

        return null;
    }

    public static string Sanitize(string value)
    {
        return WebUtility.HtmlEncode(value.Trim());
    }

    private static bool ContainsDangerousHtml(string value)
    {
        var lowered = value.ToLowerInvariant();

        return lowered.Contains("<script") ||
               lowered.Contains("</script") ||
               lowered.Contains("javascript:") ||
               lowered.Contains("onerror=") ||
               lowered.Contains("onload=") ||
               lowered.Contains("<iframe") ||
               lowered.Contains("<object") ||
               lowered.Contains("<embed");
    }
}