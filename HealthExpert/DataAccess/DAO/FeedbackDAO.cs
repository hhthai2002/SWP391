using BussinessObject.ContextData;
using BussinessObject.Model.ModelCourse;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        //            var account = context.accounts.FirstOrDefault(account => account.accountId == accountId);
        //            var course = context.courses.FirstOrDefault(course => course.courseId == courseId);
        //            feedback.account = account;
        //            feedback.course = course;
        //            context.feedbacks.Add(feedback);
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
                context.feedbacks.Add(feedback);
                context.SaveChanges();
            }
        }

        public static void DeleteFeedback(Feedback feedback)
        {
            using (var context = new HealthExpertContext())
            {
                context.feedbacks.Remove(feedback);
                context.SaveChanges();
            }
        }

        public static List<Feedback> GetFeedbacks()
        {
            using (var context = new HealthExpertContext())
            {
                return context.feedbacks.ToList();
            }
        }

        public static Feedback GetFeedbackById(Guid feedbackId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.feedbacks.FirstOrDefault(f => f.feedbackId == feedbackId);
            }
        }


        public static void UpdateFeedback(Feedback feedback)
        {
            using (var context = new HealthExpertContext())
            {
                context.feedbacks.Update(feedback);
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
        //            var account = context.accounts.FirstOrDefault(account => account.accountId == accountId);
        //            var feedbackUpdate = context.feedbacks.FirstOrDefault(feedback => feedback.feedbackId == feedbackId);
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
