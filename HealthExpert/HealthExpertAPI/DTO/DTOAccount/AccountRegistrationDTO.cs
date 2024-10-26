using System.ComponentModel.DataAnnotations;
using System;

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

        [Required]
        [AgeValidation(12)] // Đảm bảo tuổi >= 12
        public DateTime birthDate { get; set; }

        public int roleId { get; set; }
        public bool isActive { get; set; }
    }

    public class AgeValidation : ValidationAttribute
    {
        private readonly int _minimumAge;

        public AgeValidation(int minimumAge)
        {
            _minimumAge = minimumAge;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value is DateTime birthDate)
            {
                // Kiểm tra ngày sinh không được là ngày tương lai
                if (birthDate > DateTime.Now)
                {
                    return new ValidationResult("Ngày sinh không được là ngày tương lai.");
                }

                // Tính tuổi
                int age = DateTime.Now.Year - birthDate.Year;
                if (birthDate > DateTime.Now.AddYears(-age))
                {
                    age--;
                }

                // Kiểm tra tuổi tối thiểu
                if (age < _minimumAge)
                {
                    return new ValidationResult($"Bạn phải từ {_minimumAge} tuổi trở lên.");
                }

                return ValidationResult.Success;
            }

            return new ValidationResult("Ngày sinh không hợp lệ.");
        }
    }
}