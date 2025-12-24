using GymManagement.Application.DTOs.Services;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServicesController : ControllerBase
    {
        private readonly IServiceService _serviceService;

        public ServicesController(IServiceService serviceService)
        {
            _serviceService = serviceService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateServiceDto dto)
        {
            var service = await _serviceService.CreateServiceAsync(dto);
            return Ok(service);
        }

        [HttpPost("assign")]
        public async Task<IActionResult> Assign([FromBody] AssignServiceDto dto)
        {
            var userService = await _serviceService.AssignServiceToUserAsync(dto);
            return Ok(userService);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserServices(long userId)
        {
            var services = await _serviceService.GetUserServicesAsync(userId);
            return Ok(services);
        }

        [HttpPost("use-session")]
        public async Task<IActionResult> UseSession(long userId, long serviceId)
        {
            await _serviceService.UseServiceSessionAsync(userId, serviceId);
            return Ok(new { Success = true });
        }
    }

}
