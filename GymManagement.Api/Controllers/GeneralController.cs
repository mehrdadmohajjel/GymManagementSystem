using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/general")]
    public class GeneralController : ControllerBase
    {
        private readonly IGymService _gymService;

        public GeneralController(IGymService gymService)
        {
            _gymService = gymService;
        }
        /// <summary>
        /// گرفتن باشگاه کاربر
        /// </summary>
        [HttpGet("{userId}/gym")]
        public async Task<IActionResult> GetUserGym(long userId)
        {
            var result = await _gymService.GetUserGymAsync(userId);
            return Ok(result);
        }

    }
}
