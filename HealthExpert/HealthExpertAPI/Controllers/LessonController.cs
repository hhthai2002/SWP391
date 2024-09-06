using BussinessObject.ContextData;
using BussinessObject.Model.ModelSession;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOLesson;
using HealthExpertAPI.Extension.ExSession;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        private readonly ILessonRepository _repository = new LessonRepository();
        private readonly HealthExpertContext _context = new HealthExpertContext();
        private readonly IManageFile _service;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IFileService _serviceAzure;


        private readonly IConfiguration _configuration;
        private Microsoft.AspNetCore.Hosting.IHostingEnvironment _env;
        private string _uploadPath;

        public LessonController(IConfiguration configuration, HealthExpertContext context, Microsoft.AspNetCore.Hosting.IHostingEnvironment env, IManageFile service, IWebHostEnvironment webHostEnvironment, IFileService serviceAzure)
        {
            _configuration = configuration;
            _context = context;
            _env = env;
            _uploadPath = Path.Combine(_env.ContentRootPath, "Uploads");
            Directory.CreateDirectory(_uploadPath);
            _service = service;
            _webHostEnvironment = webHostEnvironment;
            _serviceAzure = serviceAzure;
        }


        //Upload Lesson by Video
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadFile(IFormCollection formData)
        {
            var file = new FileModels(formData.Files[0]);


            if (file.VideoFile.Length > 0)
            {
                await Upload(file);

                var lessonId = formData["lessonId"].ToString();
                var caption = formData["caption"].ToString();
                var cover = formData["cover"].ToString();
                var sessionId = formData["sessionId"].ToString();

                if (!string.IsNullOrEmpty(formData["caption"]) &&
                    !string.IsNullOrEmpty(formData["cover"]) &&
                    !string.IsNullOrEmpty(formData["sessionId"]))
                {
                    var lesson = new Lesson
                    {
                        lessonId = lessonId,
                        videoFile = file.VideoFile.FileName,
                        caption = caption,
                        cover = cover,
                        sessionId = sessionId,
                        viewProgress = 0
                    };

                    _repository.AddLesson(lesson);
                    return Ok();
                }
                else
                {
                    return BadRequest("Missing required parameters: caption, cover, or sessionId.");
                }
            }
            else
            {
                return BadRequest("No file selected.");
            }
        }

        private async Task Upload(FileModels file)
        {
            await _serviceAzure.Upload(file);
            //return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get(string name)
        {
            var videoFileStream = await _serviceAzure.Get(name);
            string fileType = "mp4";
            if (name.Contains("mov"))
            {
                fileType = "mov";
            }

            return File(videoFileStream, $"video/{fileType}");
        }

        //Get List Lesson
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<LessonDTO>> GetLessons()
        {
            var lessonList = _repository.GetAllLesson();
            return Ok(lessonList);
        }

        //Get Lesson By Id
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<LessonDTO> GetLessonById(string id)
        {
            var lesson = _repository.GetLessonById(id);
            if (lesson == null)
            {
                return NotFound();
            }
            return Ok(lesson.ToLessonDTO());
        }

        //Get Lesson By Name
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<LessonDTO> GetLessonByName(string name)
        {
            var lesson = _repository.GetAllLesson()
                .Where(l => l.caption.Contains(name)).ToList();
            if (lesson == null)
            {
                return NotFound();
            }

            var lessonDTOs = lesson.Select(l => l.ToLessonDTO()).ToList();
            return Ok(lessonDTOs);
        }

        //Update Lesson
        [AllowAnonymous] //Sẽ chỉnh sửa thành Course Manager và Course Administrator
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateLesson(string id, LessonUpdateDTO lessonDTO)
        {
            var lesson = _repository.GetLessonById(id);
            if (lesson == null)
            {
                return NotFound();
            }
            lesson.caption = lessonDTO.caption;
            lesson.cover = lessonDTO.cover;
            _repository.UpdateLesson(id, lesson);
            return NoContent();
        }

        //Delete Lesson
        [AllowAnonymous]
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteLesson(string id)
        {
            var lesson = _repository.GetLessonById(id);
            if (lesson == null)
            {
                return NotFound();
            }
            _repository.DeleteLesson(id);
            return NoContent();
        }

        //Update View Progress
        [AllowAnonymous]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult UpdateViewProgress(string id, ViewProgressDTO viewProgressDTO)
        {
            var lesson = _repository.GetLessonById(id);
            if (lesson == null)
            {
                return BadRequest("Lesson not found.");
            }

            // Cập nhật giá trị tiến độ xem
            lesson.viewProgress = viewProgressDTO.viewProgress;

            _repository.UpdateLesson(id, lesson);
            _context.SaveChanges();

            return Ok();
        }

        //
    }
}