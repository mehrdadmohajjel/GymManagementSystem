using GymManagement.Application.Constants;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [Authorize(Roles = Roles.SystemAdmin)]
    [ApiController]
    [Route("api/dashboard/system-admin")]
    public class SystemAdminDashboardController : ControllerBase
    {
        private readonly IDashboardService _service;

        public SystemAdminDashboardController(IDashboardService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
            => Ok(await _service.GetSystemAdminAsync());
    }

}
