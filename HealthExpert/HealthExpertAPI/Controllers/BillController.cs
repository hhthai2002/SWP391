using BussinessObject.ContextData;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOOrder;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillRepository _repository = new BillRepository();
        private readonly HealthExpertContext _context;
        private static readonly Random random = new Random();

        private readonly IVnPayService _service;
        private readonly IConfiguration _configuration;

        public BillController(IVnPayService service, IConfiguration configuration, HealthExpertContext context)
        {
            _configuration = configuration;
            _service = service;
            _context = context;
        }

        //Get List Bills
        [AllowAnonymous]
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<List<BillDTO>> GetBills()
        {
            var billList = _repository.GetAllBills();
            return Ok(billList);
        }
    }
}
