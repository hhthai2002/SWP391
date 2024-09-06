using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOFeedback
{
    public class FeedbackDTO
    {
        public Guid feedbackId { get; set; }
        public Guid accountId { get; set; }
        public string courseId { get; set; }
        public string detail { get; set; }
    }
}
