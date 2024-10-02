using BussinessObject.ContextData;
using BussinessObject.Model.ModelCourse;

namespace DataAccess.DAO
{
    public class FeedbackDAO
    {
        //Add Feedback by accountId and courseId
        //public static void AddFeedback(Guid accountId, string courseId, Feedback feedback)
        //{
        //    try
        //    {
        //        using (var context = new HealthExpertContext())
        //        {
        //            var account = context.Accounts.FirstOrDefault(account => account.accountId == accountId);
        //            var course = context.Courses.FirstOrDefault(course => course.courseId == courseId);
        //            feedback.account = account;
        //            feedback.course = course;
        //            context.Feedbacks.Add(feedback);
        //            context.SaveChanges();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
        public static void AddFeedback(Feedback feedback)
        {
            using (var context = new HealthExpertContext())
            {
                context.Feedbacks.Add(feedback);
                context.SaveChanges();
            }
        }

        public static void DeleteFeedback(Feedback feedback)
        {
            using (var context = new HealthExpertContext())
            {
                context.Feedbacks.Remove(feedback);
                context.SaveChanges();
            }
        }

        public static List<Feedback> GetFeedbacks()
        {
            using (var context = new HealthExpertContext())
            {
                return context.Feedbacks.ToList();
            }
        }

        public static Feedback GetFeedbackById(Guid feedbackId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.Feedbacks.FirstOrDefault(f => f.feedbackId == feedbackId);
            }
        }


        public static void UpdateFeedback(Feedback feedback)
        {
            using (var context = new HealthExpertContext())
            {
                context.Feedbacks.Update(feedback);
                context.SaveChanges();
            }
        }

        //update feedback by accountId and feedbackId
        //public static void UpdateFeedback(Guid accountId, Guid feedbackId, Feedback feedback)
        //{
        //    try
        //    {
        //        using (var context = new HealthExpertContext())
        //        {
        //            var account = context.Accounts.FirstOrDefault(account => account.accountId == accountId);
        //            var feedbackUpdate = context.Feedbacks.FirstOrDefault(feedback => feedback.feedbackId == feedbackId);
        //            feedbackUpdate.account = account;
        //            feedbackUpdate.feedbackContent = feedback.feedbackContent;
        //            feedbackUpdate.feedbackDate = feedback.feedbackDate;
        //            feedbackUpdate.feedbackRating = feedback.feedbackRating;
        //            context.SaveChanges();
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}
    }
}
