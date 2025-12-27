using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Gyms;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/gyms")]
    [Authorize(Roles = Roles.SystemAdmin)]
    public class GymsController : ControllerBase
    {
        private readonly IGymService _gymService;

        public GymsController(IGymService gymService)
        {
            _gymService = gymService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateGymDto dto)
        {
            await _gymService.CreateGymAsync(dto);
            return Ok();
        }

        [HttpPost("assign-admin")]
        public async Task<IActionResult> AssignAdmin(AssignGymAdminDto dto)
        {
            await _gymService.AssignGymAdminAsync(dto);
            return Ok();
        }

  


    }

}
