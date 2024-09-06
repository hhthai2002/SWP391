namespace HealthExpertAPI.DTO.DTOLesson
{
    public class LessonProgressDTO
    {
        public string lessonId { get; set; }
        public string caption { get; set; }
        public bool isActive { get; set; }
        public double viewProgress { get; set; }
    }
}
