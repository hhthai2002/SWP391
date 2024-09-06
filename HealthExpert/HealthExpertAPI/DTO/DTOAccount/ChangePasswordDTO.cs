using System.ComponentModel.DataAnnotations;

namespace HealthExpertAPI.DTO.DTOAccount
{
    public class ChangePasswordDTO
    {
        [Required]
        public string username { get; set; } = string.Empty;
        [Required]
        public string oldPassword { get; set; } = string.Empty;
        [Required]
        public string newPassword { get; set; } = string.Empty;
        [Required]
        [Compare("newPassword")]
        public string confirmPassword { get; set; } = string.Empty;
    }
}
