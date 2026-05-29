using System.Text.RegularExpressions;

namespace Portfolio.Auth.Api.Services;

public class PasswordPolicyService
{
    public bool IsValid(string password, out string error)
    {
        if (string.IsNullOrWhiteSpace(password) || password.Length < 6)
        {
            error = "Le mot de passe doit contenir au moins 6 caractères.";
            return false;
        }

        if (!password.Any(char.IsUpper))
        {
            error = "Le mot de passe doit contenir au moins une majuscule.";
            return false;
        }

        if (!password.Any(char.IsDigit))
        {
            error = "Le mot de passe doit contenir au moins un chiffre.";
            return false;
        }

        if (!Regex.IsMatch(password, "^[a-zA-Z0-9]+$"))
        {
            error = "Le mot de passe doit contenir uniquement des lettres et des chiffres.";
            return false;
        }

        error = string.Empty;
        return true;
    }
}