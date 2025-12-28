using System.ComponentModel.DataAnnotations;

namespace GymManagement.Application.DTOs.Auth
{
    public class AuthResultDto
    {
        [Display(Name = "توکن دسترسی")]
        public string? AccessToken { get; set; }

        [Display(Name = "توکن به روزرسانی")]
        public string? RefreshToken { get; set; }

        [Display(Name = "توکن تصاویر")]
        public string? UrlToken { get; set; }
        public string? Role { get; set; }

    }
}
