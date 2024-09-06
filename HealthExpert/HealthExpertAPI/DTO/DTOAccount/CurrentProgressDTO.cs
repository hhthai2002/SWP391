namespace HealthExpertAPI.DTO.DTOAccount
{
    public class CurrentProgressDTO
    {
        public Guid accountId {  get; set; }
        public string currentCourseId { get; set; }
        public string currentSessionId { get; set; }
        public string currentLessonId { get; set; }
    }
}
