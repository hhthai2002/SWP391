using BussinessObject.ContextData;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOCourse;
using HealthExpertAPI.Extension.ExCourse;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TypeController : ControllerBase
    {
        private readonly HealthExpertContext _context = new HealthExpertContext();
        private readonly ITypeRepository _repository = new TypeRepository();

        private readonly IConfiguration _configuration;

        public TypeController(IConfiguration configuration, HealthExpertContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        //Add Type Course
        [AllowAnonymous] //Sẽ chỉnh sửa
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddTypeCategory(TypeDTO typeCategoryDTO)
        {
            if (_context.types.Any(s => s.typeId == typeCategoryDTO.typeId))
            {
                return BadRequest();
            }

            BussinessObject.Model.ModelCourse.Type type = typeCategoryDTO.ToTypeAdd();
            _repository.AddType(type);
            _context.SaveChanges();
            return Ok();
        }

        //Get List Types
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<TypeDTO>> GetTypes()
        {
            var typeList = _repository.GetAllType();
            return Ok(typeList);
        }

        //Get Type By Id
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TypeDTO> GetTypeById(string typeId)
        {
            var type = _repository.GetTypeById(typeId);
            if (type == null)
            {
                return NotFound();
            }
            return Ok(type.ToTypeDTO());
        }

        //Get Type By Name 
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<TypeDTO> GetTypeByName(string typeName)
        {
            var type = _repository.GetTypeByName(typeName);
            if (type == null)
            {
                return NotFound();
            }
            return Ok(type.ToTypeDTO());
        }

        //Delete Type
        [AllowAnonymous] //Sẽ chỉnh sửa
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteType(string id)
        {
            var type = _repository.GetTypeById(id);
            if (type == null)
            {
                return NotFound();
            }
            _repository.DeleteType(id);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
