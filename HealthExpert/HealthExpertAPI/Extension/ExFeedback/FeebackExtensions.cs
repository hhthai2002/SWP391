using BussinessObject.Model.ModelCourse;
using HealthExpertAPI.DTO.DTOFeedback;

namespace HealthExpertAPI.Extension.ExFeedback
{
    public static class FeebackExtensions
    {
        public static Feedback ToCreateFeedback(this FeedbackDTO feedbackDTO)
        {
            return new Feedback
            {
                feedbackId = feedbackDTO.feedbackId,
                accountId = feedbackDTO.accountId,
                courseId = feedbackDTO.courseId,
                detail = feedbackDTO.detail
            };
        }

        public static Feedback ToUpdateFeedback(this FeedbackUpdateDTO feedbackDTO)
        {
            return new Feedback
            {
                detail = feedbackDTO.detail
            };
        }

        public static FeedbackDTO ToFeedbackDTO(this Feedback feedback)
        {
            return new FeedbackDTO
            {
                feedbackId = feedback.feedbackId,
                accountId = feedback.accountId,
                courseId = feedback.courseId,
                detail = feedback.detail
            };
        }
    }
}
