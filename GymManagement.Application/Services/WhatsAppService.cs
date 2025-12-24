using GymManagement.Application.DTOs.WhatsApp;
using GymManagement.Application.Interfaces;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;


namespace GymManagement.Application.Services
{
    public class WhatsAppService : IWhatsAppService
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;

        public WhatsAppService(AppDbContext context, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
        }

        public async Task SendWhatsAppAsync(SendWhatsAppDto dto)
        {
            var setting = await _context.WhatsAppSettings
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.GymId == dto.GymId);

            if (setting == null)
                throw new Exception("تنظیمات WhatsApp برای این باشگاه یافت نشد");

            var client = _httpClientFactory.CreateClient();

            client.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", setting.AccessToken);

            var payload = new
            {
                to = dto.Mobile,
                type = "text",
                text = new { body = dto.Message }
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(setting.ApiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"ارسال پیام واتس‌اپ ناموفق: {error}");
            }
        }
    }
}
