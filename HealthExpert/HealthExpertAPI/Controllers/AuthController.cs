using BussinessObject.ContextData;
using DataAccess.Repository;
using HealthExpertAPI.DTO.DTOAccount;
using HealthExpertAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Security.Cryptography;

namespace HealthExpertAPI.Controllers
{
    [EnableCors("AllowAllHeaders")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AccountRepository accountRepository = new AccountRepository();
        private readonly RoleRepository roleRepository = new RoleRepository();
        private readonly HealthServices service = new HealthServices();
        private readonly HealthExpertContext _context = new HealthExpertContext();

        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration, HealthExpertContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var account = await _context.accounts.FirstOrDefaultAsync(a => a.userName == loginDTO.userName);
            if (account == null || !account.isActive)
            {
                return BadRequest("User not found!!!");
            }

            if (!VerifyPasswordHash(loginDTO.password, account.passwordHash, account.passwordSalt))
            {
                return BadRequest("Password is incorrect!!!");
            }

            if(account.verifiedAt == null)
            {
                return BadRequest("Please verify your account!!!");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, account.userName),
                new Claim(ClaimTypes.Role, roleRepository.GetAllRoles().First(role => role.roleId == account.roleId).roleName)
            };
            string token = service.CreateToken(claims, _configuration);

            SetCookie("access_token", token, true);
            SetCookie("uid", service.EncryptString(account.accountId.ToString(), _configuration), false);

            return Ok($"Wellcome back, {account.userName}!");
        }

        //Verify token
        [HttpPost("verify")]
        public async Task<IActionResult> Verify(string token)
        {
            var account = await _context.accounts.FirstOrDefaultAsync(u => u.verificationToken == token);
            if (account == null)
            {
                return BadRequest("Invalid token.");
            }

            account.verifiedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("User verified! :)");
        }

        //LOGOUT
        [HttpPost, Authorize]
        public IActionResult Logout()
        {
            foreach (var cookie in Request.Cookies.Keys)
            {
                System.Diagnostics.Debug.Write("Cookie: " + cookie);
                Response.Cookies.Delete(cookie, new CookieOptions()
                {
                    IsEssential = true,
                    SameSite = SameSiteMode.None,
                    Secure = true
                });
            }

            return Ok();
        }

        //Set Cookie
        private void SetCookie(string name, string value, bool httpOnly)
        {
            Response.Cookies.Append(name, value, new CookieOptions()
            {
                IsEssential = true,
                Expires = DateTime.Now.AddHours(3),
                Secure = true,
                HttpOnly = httpOnly,
                SameSite = SameSiteMode.None
            });
        }

        //Create Verify Password Hash
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
