using System.ComponentModel.DataAnnotations;

namespace HealthExpertAPI.DTO.DTOAccount
{
    public class LoginDTO
    {
        [Required]
        public string userName { get; set; } = string.Empty;
        [Required]
        public string password { get; set; } = string.Empty;
    }
}
