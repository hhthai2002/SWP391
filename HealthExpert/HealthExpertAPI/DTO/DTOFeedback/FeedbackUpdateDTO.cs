namespace HealthExpertAPI.DTO.DTOFeedback
{
    public class FeedbackUpdateDTO
    {
        public Guid accountId { get; set; }
        public string courseId { get; set; }
        public string detail { get; set; }
    }
}
