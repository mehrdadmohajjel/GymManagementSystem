using GymManagement.Application.DTOs.Auth;
using GymManagement.Application.DTOs.Users;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            var clientIP = HttpContext.Connection.RemoteIpAddress?.ToString();
            var Result = await _authService.LoginAsync(dto, clientIP!);
            return Ok(Result);
        }


        [HttpGet]
        [Route("UserInfo")]
        [Authorize]
        public async Task<ActionResult<UserListDto>> UserInfo(long UserId)
        {
            var Result = await _authService.UserInfo( HttpContext.User.GetUserId());
            return Ok(Result);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            return Ok(await _authService.RefreshTokenAsync(refreshToken));
        }
    }

}
