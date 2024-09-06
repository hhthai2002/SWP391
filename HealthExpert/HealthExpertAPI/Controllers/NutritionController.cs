using BussinessObject.ContextData;
using BussinessObject.Model.ModelNutrition;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTONutrition;
using HealthExpertAPI.Extension.ExNutrition;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NutritionController : ControllerBase
    {
        private readonly INutritionRepository _repository = new NutritionRepository();
        private readonly HealthExpertContext _context;

        public NutritionController(HealthExpertContext context)
        {
            _context = context;
        }

        //Get List Nutritions
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<Nutrition>> GetNutritions()
        {
            var nutritionList = _repository.GetAllNutritions();
            return Ok(nutritionList);
        }

        //View Nutrition By Id
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Nutrition> GetNutritionById(string id)
        {
            var nutrition = _repository.GetNutritionById(id);
            if (nutrition == null)
            {
                return NotFound();
            }
            return Ok(nutrition);
        }

        //View Nutrition By Title
        //[HttpGet("{title}")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public ActionResult<Nutrition> GetNutritionByTitle(string title)
        //{
        //    var nutrition = _repository.GetNutritionByTitle(title);
        //    if (nutrition == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(nutrition);
        //}

        //Add Nutrition
        //[HttpPost]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //public ActionResult AddNutrition(NutritionDTO nutritionDTO)
        //{
        //    if(_context.nutritions.Any(n => n.nutriId == nutritionDTO.nutriId))
        //    {
        //        return BadRequest("Nutrition already exists");
        //    }
        //    Nutrition nutrition = nutritionDTO.ToNutrition();
        //    _repository.AddNutrition(nutrition);
        //    return Ok();
        //}

        //Update Nutrition
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult UpdateNutrition(string id, NutritionUpdateDTO nutritionDTO)
        {
            var nutrition = _repository.GetNutritionById(id);
            if (nutrition == null)
            {
                return BadRequest("Nutrition not found");
            }
            nutrition = nutritionDTO.ToUpdateNutrition();
            _repository.UpdateNutrition(id, nutrition);
            return Ok();
        }

        //Delete Nutrition
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteNutrition(string id)
        {
            var nutrition = _repository.GetNutritionById(id);
            if (nutrition == null)
            {
                return BadRequest("Nutrition not found");
            }
            _repository.DeleteNutrition(id);
            return Ok();
        }

        //Create nutrition by lessonId
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult CreateNutritionByLessonId(NutritionDTO nutritionDTO)
        {
            if (_context.sessions.FirstOrDefault(n => n.sessionId == nutritionDTO.sessionId) == null)
            {
                return BadRequest("Session not found");
            }
            Nutrition nutrition = nutritionDTO.ToNutrition();
            _repository.CreateNutritionBySessonId(nutrition);
            return Ok();
        }
    }
}
