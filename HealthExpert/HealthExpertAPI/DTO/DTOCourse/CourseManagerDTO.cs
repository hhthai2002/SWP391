namespace HealthExpertAPI.DTO.DTOCourse
{
    public class CourseManagerDTO
    {
        public string courseId { get; set; }
        public int courseManagerId { get; set; }
        public List<string>? accountEmails { get; set; }
    }
}
