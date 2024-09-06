namespace HealthExpertAPI.DTO.DTOEnrollment
{
    public class EnrollmentDTOUpdate
    {
        public bool enrollStatus { get; set; }
        public DateTime dateUpdate { get; set; } = DateTime.Now;
    }
}
