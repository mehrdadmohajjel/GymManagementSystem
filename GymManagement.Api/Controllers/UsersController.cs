using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Users;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _service;

        public UsersController(IUserService service)
        {
            _service = service;
        }

        // ثبت‌نام عمومی ورزشکار
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterUserDto dto)
        {
            await _service.RegisterAsync(dto);
            return Ok();
        }

        // افزودن کاربر توسط مدیر
        [Authorize(Roles = $"{Roles.SystemAdmin},{Roles.GymAdmin}")]
        [HttpPost]
        public async Task<IActionResult> Create(CreateUserDto dto)
        {
            await _service.CreateUserAsync(dto);
            return Ok();
        }

        // لیست کاربران
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> List([FromQuery] string role, [FromQuery] long? gymId)
        {
            return Ok(await _service.GetUsersAsync(role, gymId));
        }

        // ریست رمز عبور
        [HttpPost("reset-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            await _service.ResetPasswordAsync(dto);
            return Ok();
        }
    }

}
