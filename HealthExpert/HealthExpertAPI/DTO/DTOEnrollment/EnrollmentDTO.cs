namespace HealthExpertAPI.DTO.DTOEnrollment
{
    public class EnrollmentDTO
    {
        public Guid accountId { get; set; }
        public string courseId { get; set; }
        public DateTime enrollDate { get; set; }
        public bool enrollStatus { get; set; }
    }
}
