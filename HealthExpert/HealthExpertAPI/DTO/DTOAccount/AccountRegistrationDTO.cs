using System.ComponentModel.DataAnnotations;

namespace HealthExpertAPI.DTO.DTOAccount
{
    public class AccountRegistrationDTO
    {
        [Required]
        public string userName { get; set; } = string.Empty;
        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$")]
        [DataType(DataType.Password)]
        public string password { get; set; } = string.Empty;
        [Required, Compare("password")]
        public string confirmPassword { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string email { get; set; } = string.Empty;
        public string fullName { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public bool gender { get; set; }
        public DateTime birthDate { get; set; }
        public int roleId { get; set; }
        public bool isActive { get; set; }
    }
}
