using BussinessObject.ContextData;
using BussinessObject.Model.ModelCourse;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOFeedback;
using HealthExpertAPI.Extension.ExFeedback;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    //Feedback Controller
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _repository = new FeedbackRepository();
        private readonly HealthExpertContext _context;

        public FeedbackController(HealthExpertContext context)
        {
            _context = context;
        }

        //Get List Feedbacks
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<Feedback>> GetFeedbacks()
        {
            var feedbackList = _repository.GetFeedbacks();
            return Ok(feedbackList);
        }

        //View Feedback By Id
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Feedback> GetFeedbackById(Guid id)
        {
            var feedback = _repository.GetFeedbackById(id);
            if (feedback == null)
            {
                return NotFound();
            }
            return Ok(feedback);
        }

        //Update Feedback by feedbackId
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateFeedback(FeedbackUpdateDTO feedbackDTO)
        {
            var feedback = _context.feedbacks.FirstOrDefault(f => f.accountId == feedbackDTO.accountId && f.courseId == feedbackDTO.courseId);
            if(feedback == null)
            {
                return NotFound();
            }
            Feedback fb = feedbackDTO.ToUpdateFeedback();
            fb.feedbackId = feedback.feedbackId;
            fb.accountId = feedback.accountId;
            fb.courseId = feedback.courseId;
            _repository.UpdateFeedback(fb);
            return Ok();
        }

        //Delete Feedback by courseId and accountId
        [HttpDelete("{accountId}/{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteFeedback(Guid accountId, string courseId)
        {
            var feedback = _context.feedbacks.FirstOrDefault(f => f.accountId == accountId && f.courseId == courseId);
            if (feedback == null)
            {
                return NotFound();
            }
            _repository.DeleteFeedback(feedback);
            return Ok();
        }

        //Create Feedback by accountId and courseId
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult AddFeedback(FeedbackDTO feedbackDTO)
        {
            var feedback = _context.feedbacks.FirstOrDefault(f => f.accountId == feedbackDTO.accountId && f.courseId == feedbackDTO.courseId);
            if (feedback != null)
            {
                return BadRequest("You only can give a feedback!!!");
            }
            Feedback fb = feedbackDTO.ToCreateFeedback();
            _repository.AddFeedback(fb);
            return Ok();
        }
    }
}
