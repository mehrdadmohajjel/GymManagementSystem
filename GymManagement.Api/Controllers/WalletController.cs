using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Wallet;
using GymManagement.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers
{
    [ApiController]
    [Route("api/wallet")]
    [Authorize]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _service;

        public WalletController(IWalletService service)
        {
            _service = service;
        }

        // شارژ دستی توسط مدیر
        [Authorize(Roles = $"{Roles.SystemAdmin},{Roles.GymAdmin}")]
        [HttpPost("charge")]
        public async Task<IActionResult> Charge(ChargeWalletDto dto)
        {
            await _service.ChargeAsync(dto);
            return Ok();
        }

        // مصرف اعتبار (سیستم)
        [Authorize]
        [HttpPost("consume")]
        public async Task<IActionResult> Consume(ConsumeWalletDto dto)
        {
            await _service.ConsumeAsync(dto);
            return Ok();
        }

        // گزارش تراکنش‌ها
        [Authorize]
        [HttpGet("transactions/{userId}")]
        public async Task<IActionResult> Transactions(long userId)
        {
            return Ok(await _service.GetTransactionsAsync(userId));
        }
    }

}
