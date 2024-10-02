namespace HealthExpertAPI.DTO.DTOCourse
{
    public class TeacherDTO
    {
        public string courseId { get; set; }
        public int teacherId { get; set; }
        public List<string>? accountEmails { get; set; }
    }
}
