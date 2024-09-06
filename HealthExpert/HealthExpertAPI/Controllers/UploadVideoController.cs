using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;


namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UploadVideoController : ControllerBase
    {
        //private readonly IFileService _service;

        //public UploadVideoController(IFileService fileService)
        //{
        //    _service = fileService;
        //}

        //[HttpPost]
        //public async Task<IActionResult> Upload([FromForm] FileModels file)
        //{
        //    await _service.Upload(file);
        //    return Ok("Success");
        //}

        //[HttpGet]
        //public async Task<IActionResult> Get(string name)
        //{
        //    var videoFileStream = await _service.Get(name);
        //    string fileType = "mp4";
        //    if (name.Contains("mov"))
        //    {
        //        fileType = "mov";
        //    }

        //    return File(videoFileStream, $"video/{fileType}");
        //}
    }
}
