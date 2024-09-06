using BussinessObject.ContextData;
using BussinessObject.Model.ModelSession;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOSession;
using HealthExpertAPI.Extension.ExSession;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly ISessionRepository _repository = new SessionRepository();
        private readonly HealthExpertContext _context = new HealthExpertContext();

        private readonly IConfiguration _configuration;

        public SessionController(IConfiguration configuration, HealthExpertContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        //Add Session
        [AllowAnonymous] //Sẽ chỉnh sửa có courseAdmin, CourseManager mới được thêm
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddSession(SessionDTO sessionDTO)
        {
            var course = _context.courses.FirstOrDefault(c => c.courseId == sessionDTO.courseId);
            if (course == null)
            {
                return BadRequest("Course not found.");
            }

            if (_context.sessions.Any(s => s.sessionId == sessionDTO.sessionId))
            {
                return BadRequest("Session does exists!!!");
            }

            Session session = sessionDTO.ToSessionAdd();
            session.learnProgress = false;

            _repository.AddSession(session);
            _context.SaveChanges();

            return Ok("Session successfully add!!!");
        }

        //Get list of sessions
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<SessionDTO>> GetSessions()
        {
            var sessionList = _repository.GetAllSession();
            return Ok(sessionList);
        }

        //Get Session by Id
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SessionDTO> GetSessionById(string id)
        {
            var session = _repository.GetSessionById(id);
            if (session == null || session.learnProgress != true)
            {
                return NotFound();
            }
            return Ok(session.ToSessionDTO());
        }

        //Get Session by Name
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<SessionDTO> GetSessionByName(string name)
        {
            var session = _repository.GetAllSession().Where(s => s.sessionName.Contains(name)).ToList();
            if (session == null)
            {
                return NotFound();
            }

            var sessionDTOs = session.Select(s => s.ToSessionDTO()).ToList();
            return Ok(sessionDTOs);
        }

        //Update Session
        [AllowAnonymous] //Sẽ chỉnh sửa chỉ có CourseAdmin, CourseManager mới được update
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateSession(string id, SessionUpdateDTO sessionDTO)
        {
            var session = _repository.GetSessionById(id);
            if (session == null)
            {
                return NotFound();
            }

            session.sessionName = sessionDTO.sessionName;
            session.description = sessionDTO.description;
            session.learnProgress = sessionDTO.learnProgress;

            _repository.UpdateSession(id, session);
            return NoContent();
        }

        //Delete Session
        [AllowAnonymous] //Sẽ chỉnh sửa chỉ có CourseAdmin mới được xóa
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteSession(string id)
        {
            var session = _repository.GetSessionById(id);
            if (session == null)
            {
                return NotFound();
            }
            _repository.DeleteSession(id);
            return NoContent();
        }
    }
}
