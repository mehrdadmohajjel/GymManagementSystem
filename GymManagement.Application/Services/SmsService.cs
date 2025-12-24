using GymManagement.Application.DTOs.Sms;
using GymManagement.Application.Interfaces;
using GymManagement.Infrastructure.Data;
using Kavenegar;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Services
{
    public class SmsService : ISmsService
    {
        private readonly AppDbContext _context;

        public SmsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task SendSmsAsync(SendSmsDto dto)
        {
            var setting = await _context.SmsSettings
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.GymId == dto.GymId);

            if (setting == null) throw new Exception("تنظیمات SMS برای این باشگاه یافت نشد");
            if (string.IsNullOrWhiteSpace(setting.Sender))
                throw new Exception("شماره Sender برای پیامک تنظیم نشده است");

            try
            {
                var api = new KavenegarApi(setting.ApiKey);

                var result = api.Send(
                    sender: setting.Sender,
                    receptor: dto.Mobile,
                    message: dto.Message
                );

                Console.WriteLine($"SMS Sent. Status: {result.Status}, MessageId: {result.Messageid}");
            }
            catch (Kavenegar.Exceptions.ApiException ex)
            {
                throw new Exception($"خطای API Kavenegar: {ex.Message}");
            }
            catch (Kavenegar.Exceptions.HttpException ex)
            {
                throw new Exception($"خطای Http Kavenegar: {ex.Message}");
            }
        }

        // ------------- متدهای کمکی ----------------

        // بعد از تراکنش موفق
        public async Task NotifyPaymentAsync(long userId, long gymId, decimal amount)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return;

            await SendSmsAsync(new SendSmsDto
            {
                GymId = gymId,
                Mobile = user.Mobile!,
                Message = $"پرداخت شما به مبلغ {amount:N0} ریال با موفقیت انجام شد. موجودی کیف پول شما بروزرسانی شد."
            });

            await CheckWalletBalanceAsync(userId, gymId);
        }

        // بررسی موجودی و ارسال هشدار
        public async Task CheckWalletBalanceAsync(long userId, long gymId)
        {
            var user = await _context.Users
                .Include(u => u.WalletBalance)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user?.WalletBalance == null) return;

            var setting = await _context.GymSettings
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.GymId == gymId);

            if (setting == null) return;

            if (user.WalletBalance <= setting.MinWalletBalanceAlert)
            {
                await SendSmsAsync(new SendSmsDto
                {
                    GymId = gymId,
                    Mobile = user.Mobile!,
                    Message = $"موجودی کیف پول شما به {user.WalletBalance:N0} ریال رسید. لطفاً برای ادامه استفاده از سرویس‌ها، کیف پول خود را شارژ کنید."
                });
            }
        }

        // بعد از استفاده از سرویس Session-based
        public async Task NotifyServiceUsageAsync(long userId, long serviceId, int remainingSessions)
        {
            var user = await _context.Users.FindAsync(userId);
            var service = await _context.Services.FindAsync(serviceId);

            if (user == null || service == null) return;

            if (service.Type == Domain.enums.ServiceType.SessionBased)
            {
                await SendSmsAsync(new SendSmsDto
                {
                    GymId = service.GymId,
                    Mobile = user.Mobile!,
                    Message = $"جلسه‌ای از سرویس {service.Title} شما استفاده شد. جلسات باقی‌مانده: {remainingSessions}"
                });
            }
            else if (service.Type == Domain.enums.ServiceType.TimeBased && remainingSessions <= 0)
            {
                await SendSmsAsync(new SendSmsDto
                {
                    GymId = service.GymId,
                    Mobile = user.Mobile!,
                    Message = $"سرویس {service.Title} شما منقضی شد."
                });
            }
        }
    }

}