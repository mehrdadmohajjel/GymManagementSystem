

using System.Security.Claims;

namespace GymManagement.Application.DTOs.Auth
{
    public static class ClaimsPrincipalExtension
    {
        public static long GetUserId(this ClaimsPrincipal ClaimsIdentity)
        {
            return Convert.ToInt64(ClaimsIdentity.FindFirst(ClaimStore.UserId));
        }

        public static long GetGymId(this ClaimsPrincipal ClaimsIdentity)
        {
            return Convert.ToInt64(ClaimsIdentity.FindFirst(ClaimStore.GymId));
        }

        public static string? GetRole(this ClaimsPrincipal ClaimsIdentity)
        {
            return ClaimsIdentity.FindFirst(ClaimStore.UserRole)!.ToString();
        }

        public static string? GetUserName(this ClaimsPrincipal ClaimsIdentity)
        {
            return ClaimsIdentity.FindFirst(ClaimStore.UserName)!.ToString();
        }
    }
}
