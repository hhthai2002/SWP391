using AutoMapper;
using BussinessObject.ContextData;
using DataAccess.Repository.IRepository;
using DataAccess.Repository;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Mvc;
using BussinessObject.Model.ModelUser;
using HealthExpertAPI.DTO.DTOBMI;
using HealthExpertAPI.Extension.ExBMI;
using Microsoft.AspNetCore.Authorization;

namespace HealthExpertAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BMIController : Controller
    {
        private readonly IBMIRepository _repository = new BMIRepository();
        private readonly IAccountRepository _accountRepository = new AccountRepository();
        private readonly HealthServices service = new HealthServices();
        private readonly HealthExpertContext _context = new HealthExpertContext();

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public BMIController(IConfiguration configuration, IMapper mapper, HealthExpertContext context)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult AddBMI(BMIDTO bmiDTO)
        {
            var account = _context.accounts.FirstOrDefault(x => x.accountId == bmiDTO.accountId);
            if (account == null)
            {
                return BadRequest("Account not found!!");
            }

            var existingBMI = _context.bmis.FirstOrDefault(b => b.accountId == bmiDTO.accountId);
            if (existingBMI != null)
            {
                return BadRequest("You already have a BMI entry");
            }

            BMI bmi = bmiDTO.ToRegisterBMI();
            _repository.AddBMI(bmi);
            return Ok();
        }


        //GET BMI by accountId
        [HttpGet("{accountId}")]
        [AllowAnonymous]
        public IActionResult GetBMIByAccountId(Guid accountId)
        {
            var bmi = _repository.GetBMI().Where(b => b.accountId == accountId).ToList();
            if (bmi == null)
            {
                return BadRequest("BMI not found!!");
            }
            return Ok(bmi);
        }
        //DELETE BMI by bmiId
        [HttpDelete("{bmiId}")]
        [AllowAnonymous]
        public IActionResult DeleteBMI(int bmiId)
        {
            var bmi = _repository.GetBMIById(bmiId);
            if (bmi == null)
            {
                return BadRequest("BMI not found!!");
            }
            _repository.DeleteBMI(bmiId);
            return Ok();
        }

        //UPDATE BMI by bmiId
        [HttpPut("{bmiId}")]
        [AllowAnonymous]
        public IActionResult UpdateBMI(int bmiId, BMIDTOUpdate bmiDTO)
        {
            var bmi = _repository.GetBMIById(bmiId);
            if (bmi == null)
            {
                return BadRequest("BMI not found!!");
            }
            BMI updatedBMI = bmiDTO.ToUpdateBMI();
            updatedBMI.bmiId = bmiId;
            _repository.UpdateBMI(updatedBMI);
            return Ok();
        }
        


            //GET all BMI
        [HttpGet]
        [AllowAnonymous]
        public IActionResult GetBMI()
        {
            var bmi = _repository.GetBMI().Select(b => b.ToBMIDTO());
            return Ok(bmi);
        }
    }
}
