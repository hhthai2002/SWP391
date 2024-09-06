using BussinessObject.Model.ModelCourse;
using DataAccess.DAO;
using DataAccess.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repository
{
    public class FeedbackRepository : IFeedbackRepository
    {
        public void AddFeedback(Feedback feedback)
        {
            FeedbackDAO.AddFeedback(feedback);
        }

        public void DeleteFeedback(Feedback feedback)
        {
            FeedbackDAO.DeleteFeedback(feedback);
        }

        public List<Feedback> GetFeedbacks()
        {
            return FeedbackDAO.GetFeedbacks();
        }

        public Feedback GetFeedbackById(Guid feedbackId)
        {
            return FeedbackDAO.GetFeedbackById(feedbackId);
        }

        public void UpdateFeedback(Feedback feedback)
        {
            FeedbackDAO.UpdateFeedback(feedback);
        }

        //public void AddFeedback(Guid accountId, string courseId, Feedback feedback)
        //{
        //    FeedbackDAO.AddFeedback(accountId, courseId, feedback);
        //}
    }
}
