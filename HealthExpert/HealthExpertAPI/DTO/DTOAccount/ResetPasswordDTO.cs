using System.ComponentModel.DataAnnotations;

namespace HealthExpertAPI.DTO.DTOAccount
{
    public class ResetPasswordDTO
    {
        [Required]
        public string token { get; set; } = string.Empty;
        [Required]
        public string password { get; set; } = string.Empty;
        [Required, Compare("password")]
        public string confirmPassword { get; set; } = string.Empty;
    }
}
