namespace HealthExpertAPI.DTO.DTOAccount
{
    public record AccountDTO
    {
        public Guid accountId { get; set; }
        public string userName { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string phone { get; set; }
        public string fullName { get; set; } = string.Empty;
        public bool gender { get; set; }
        public DateTime birthDate { get; set; }
        public DateTime createDate { get; set; }
        public string bankNumber { get; set; } = string.Empty;
        public string bankName { get; set; } = string.Empty;
        public bool isActive { get; set; }
        public int roleId { get; set; }
        public string verificationToken { get; set; } = string.Empty;
        public string passwordResetToken { get; set; } = string.Empty;
    }
}
