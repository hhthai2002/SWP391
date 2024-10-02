using AutoMapper;
using BussinessObject.ContextData;
using BussinessObject.Model.ModelUser;
using DataAccess.Repository;
using DataAccess.Repository.IRepository;
using HealthExpertAPI.DTO.DTOAccount;
using HealthExpertAPI.Extension.ExAccount;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _repository = new AccountRepository();
        private readonly HealthServices service = new HealthServices();
        private readonly HealthExpertContext _context = new HealthExpertContext();

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly EmailService _emailService;

        public AccountController(IConfiguration configuration, IMapper mapper, HealthExpertContext context, EmailService emailService)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
            _emailService = emailService;
        }

        // Register
        //[AllowAnonymous]
        //[HttpPost]
        //public IActionResult Register(AccountRegistrationDTO accountDTO)
        //{
        //    if (_context.Accounts.Any(a => a.email == accountDTO.email))
        //    {
        //        return BadRequest("Account Exist!!");
        //    }

        //    CreatedPasswordHash(accountDTO.password,
        //        out byte[] passwordHash,
        //        out byte[] passwordSalt);

        //    Account account = accountDTO.ToAccountRegister(passwordHash, passwordSalt);
        //    account.verificationToken = CreateRandomToken();
        //    account.phone = accountDTO.phone;
        //    account.birthDate = accountDTO.birthDate;
        //    account.roleId = 4;
        //    account.isActive = true;

        //    _repository.AddAccount(account);
        //    return Ok("Account successfully register!!");
        //}


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register(AccountRegistrationDTO accountDTO)
        {
            // check if the user name already exists
            if (await _context.Accounts.AnyAsync(a => a.userName == accountDTO.userName))
            {
                return BadRequest("Tên đăng nhập đã tồn tại!");
            }
            // Check if the email already exists
            if (await _context.Accounts.AnyAsync(a => a.email == accountDTO.email))
            {
                return BadRequest("Email đã tồn tại!");
            }

            CreatedPasswordHash(accountDTO.password, out byte[] passwordHash, out byte[] passwordSalt);

            Account account = accountDTO.ToAccountRegister(passwordHash, passwordSalt);
            account.verificationToken = CreateRandomToken();
            account.phone = accountDTO.phone;
            account.birthDate = accountDTO.birthDate;
            account.roleId = 4;
            account.isActive = false;

            _repository.AddAccount(account);
            await _context.SaveChangesAsync(); // Ensure the account is saved to the database

            // Generate the verification link
            //var verificationLink = $"https://localhost:8173/api/Auth/VerifyAccount/verify?token={account.verificationToken}";
            //System.Diagnostics.Debug.WriteLine($"Verification Link: {verificationLink}");

            // Send the verification email
            await _emailService.SendEmailAsync(
                account.email,
                "Verify Your Account",
                $@"
                <html>
                <body style='font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;'>
                    <div style='max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; border: 1px solid #ddd;'>
                        <div style='text-align: center; margin-bottom: 20px;'>
                            <img src='https://drive.google.com/uc?export=view&id=1xS4ZGxmgBxAHEQx0uYmSNqQvu8LTxaeU' alt='HealthExpert Logo' style='width: 150px;'>
                        </div>
                        <h2 style='color: #333; text-align: center;'>Welcome to Health45!</h2>
                        <p style='font-size: 16px; color: #555; text-align: center;'>Cảm ơn bạn đã tham gia với chúng tôi. Để hoàn tất việc đăng ký, vui lòng xác thực tài khoản của bạn bằng cách sử dụng mã dưới đây:</p>
                        <div style='background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px; text-align: center; margin: 20px 0;'>
                            <h3 style='color: #007bff;'>Mã xác thực của bạn:</h3>
                            <p style='font-size: 24px; font-weight: bold; color: #333;'><b>{account.verificationToken}</b></p>
                        </div>
                        <p style='font-size: 16px; color: #555; text-align: center;'>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
                        <p style='font-size: 14px; color: #999; text-align: center;'>Trân trọng,<br>Đội ngũ Health45</p>
                    </div>
                </body>
                </html>"
            );
            return Ok("Register Successfully!");
        }

        //Forgot pw
        // Forgot Password API
        [AllowAnonymous]
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            //find account by email
            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.email == email);
            if (account == null)
            {
                return BadRequest("Email does not exist!");
            }

            //create token
            account.passwordResetToken = CreateRandomToken();
            account.resetTokenExpires = DateTime.Now.AddHours(1); // Token has 1 hour time limit
            await _context.SaveChangesAsync();

            //url to reset pw page
            var resetUrl = $"http://localhost:3000/reset-password?token={account.passwordResetToken}";

            //email send to user
            await _emailService.SendEmailAsync(
                account.email,
                "Đặt lại mật khẩu - HealthExpert",
                $@"
<html>
<body style='font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 20px;'>
    <div style='max-width: 600px; margin: auto; padding: 20px; background-color: #fff; border-radius: 10px; border: 1px solid #ddd;'>
        <div style='text-align: center; margin-bottom: 20px;'>
            <img src='https://drive.google.com/uc?export=view&id=1xS4ZGxmgBxAHEQx0uYmSNqQvu8LTxaeU' alt='HealthExpert Logo' style='width: 150px;'>
        </div>
        <h2 style='color: #333; text-align: center;'>Đặt lại mật khẩu HealthExpert</h2>
        <p style='font-size: 16px; color: #555; text-align: center;'>Chúng tôi đã nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Vui lòng nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
        <div style='text-align: center; margin: 20px 0;'>
            <a href='{resetUrl}' style='background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Đặt lại mật khẩu</a>
        </div>
        <p style='font-size: 16px; color: #555; text-align: center;'>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        <p style='font-size: 14px; color: #999; text-align: center;'>Trân trọng,<br>Đội ngũ HealthExpert</p>
    </div>
</body>
</html>"
            );

            return Ok("An email was sent!!!");
        }

        // Reset Password
        [AllowAnonymous]
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO request)
        {
            // Kiểm tra xem request có hợp lệ không
            if (request == null || string.IsNullOrWhiteSpace(request.token) || string.IsNullOrWhiteSpace(request.password))
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.passwordResetToken == request.token);

            // Kiểm tra token có hợp lệ không
            if (account == null)
            {
                return BadRequest("Token không hợp lệ.");
            }

            // Kiểm tra thời gian hết hạn
            if (account.resetTokenExpires < DateTime.Now)
            {
                return BadRequest("Token đã hết hạn.");
            }

            // Kiểm tra mật khẩu mới có giống với mật khẩu cũ không
            if (request.password == account.password)
            {
                return BadRequest("Mật khẩu mới không được giống với mật khẩu cũ.");
            }

            CreatedPasswordHash(request.password, out byte[] passwordHash, out byte[] passwordSalt);

            // Cập nhật mật khẩu và xóa token
            account.password = request.password;
            account.passwordHash = passwordHash;
            account.passwordSalt = passwordSalt;
            account.passwordResetToken = null;
            account.resetTokenExpires = null;

            await _context.SaveChangesAsync();

            return Ok("Mật khẩu đã được đặt lại thành công.");
        }

        // Register Course Admin
        [AllowAnonymous]
        [HttpPost]
        public IActionResult RegisterServiceCenter(ServiceCenterRegistrationDTO accountDTO)
        {
            if (_context.Accounts.Any(a => a.email == accountDTO.email))
            {
                return BadRequest("Account Exist!!");
            }

            CreatedPasswordHash(accountDTO.password,
                out byte[] passwordHash,
                out byte[] passwordSalt);

            Account account = accountDTO.ToServiceCenterRegister(passwordHash, passwordSalt);
            account.verificationToken = CreateRandomToken();
            account.phone = accountDTO.phone;
            account.roleId = 2;
            account.bankName = accountDTO.bankName;
            account.bankNumber = accountDTO.bankNumber;
            account.gender = true;
            account.isActive = false;

            _repository.AddAccount(account);
            return Ok("Course Admin successfully register!!");
        }

        //forgot password
        //[HttpPost]
        //public async Task<IActionResult> ForgotPassword(string username)
        //{
        //    var account = await _context.Accounts.FirstOrDefaultAsync(u => u.userName == username);
        //    if (account == null)
        //    {
        //        return BadRequest();
        //    }

        //    account.passwordResetToken = CreateRandomToken();
        //    account.resetTokenExpires = DateTime.Now.AddDays(1);
        //    await _context.SaveChangesAsync();

        //    return Ok();
        //}

        //Reset password
        [HttpPost]
        public async Task<IActionResult> ResettPassword(ResetPasswordDTO resetPasswordDTO)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.passwordResetToken == resetPasswordDTO.token);
            if (account == null || account.resetTokenExpires < DateTime.Now)
            {
                return BadRequest();
            }

            CreatedPasswordHash(resetPasswordDTO.password,
                out byte[] passwordHash,
                out byte[] passwordSalt);

            account.password = resetPasswordDTO.password;
            account.passwordHash = passwordHash;
            account.passwordSalt = passwordSalt;
            account.passwordResetToken = null;
            account.resetTokenExpires = null;

            await _context.SaveChangesAsync();

            return Ok();
        }

        //Change password
        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO changePasswordDTO)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(u => u.userName == changePasswordDTO.username);
            if (account == null)
            {
                return BadRequest();
            }
            CreatedPasswordHash(changePasswordDTO.newPassword,
                            out byte[] passwordHash,
                            out byte[] passwordSalt);
            account.password = changePasswordDTO.newPassword;
            account.passwordHash = passwordHash;
            account.passwordSalt = passwordSalt;
            account.passwordResetToken = null;
            _repository.UpdateAccount(account);
            return Ok();
        }
        //Vỉew Account
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<List<AccountDTO>> GetListAccount()
        {
            var accountList = _repository.GetListAccount().Select(account => account.ToAccountDTO());
            return Ok(accountList);
        }

        //Get Account by Id
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<AccountDTO> GetAccountById(Guid id)
        {
            var account = _repository.GetAccountById(id);
            if (account == null || !account.isActive)
            {
                return NotFound();
            }
            return Ok(account.ToAccountDTO());
        }

        // Get Username by Account ID
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<string> GetUsernameById(Guid id)
        {
            var account = _repository.GetAccountById(id);
            if (account == null || !account.isActive)
            {
                return NotFound();
            }
            return Ok(account.userName);
        }

        //Update Account
        [AllowAnonymous]
        [HttpPut("{id}")]
        public ActionResult UpdateAccount(Guid id, AccountUpdateDTO accountDTO)
        {
            var account = _repository.GetAccountById(id);
            if (account == null || !account.isActive)
            {
                return NotFound();
            }

            account.email = accountDTO.email;
            account.phone = accountDTO.phone;
            account.fullName = accountDTO.fullName;
            account.gender = accountDTO.gender;
            account.birthDate = accountDTO.birthDate;

            _repository.UpdateAccount(account);
            return NoContent();
        }

        //Delete Account when change isActive = false
        [HttpPost("{id}")]
        public ActionResult DeleteAccount(Guid id)
        {
            var account = _repository.GetAccountById(id);
            if (account == null || !account.isActive)
            {
                return NotFound();
            }
            account.isActive = false;
            _repository.UpdateAccount(account);
            return NoContent();
        }

        //Enable Account when change isActive = true
        [HttpPost("{id}")]
        public ActionResult EnableAccount(Guid id)
        {
            var account = _repository.GetAccountById(id);
            if (account == null || account.isActive)
            {
                return NotFound();
            }
            account.isActive = true;
            _repository.UpdateAccount(account);
            return NoContent();
        }

        //Create Password Hash
        private void CreatedPasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac
                    .ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        //Create Random Token
        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }

        //Get accountId by userName
        [AllowAnonymous]
        [HttpGet("{userName}")]
        public ActionResult GetAccountIdByUserName(string userName)
        {
            var account = _repository.GetAccountId(userName);
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }

        //Get Account by Email
        [AllowAnonymous]
        [HttpGet("{email}")]
        public ActionResult GetAccountByEmail(string email)
        {
            var account = _repository.GetAccountByEmail(email).Select(account => account.ToAccountDTO());
            if (account == null)
            {
                return NotFound();
            }
            return Ok(account);
        }
    }
}
