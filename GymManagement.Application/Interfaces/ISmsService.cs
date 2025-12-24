using GymManagement.Application.DTOs.Sms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface ISmsService
    {
        Task SendSmsAsync(SendSmsDto dto);
        Task NotifyPaymentAsync(long userId, long gymId, decimal amount);
        Task CheckWalletBalanceAsync(long userId, long gymId);
        Task NotifyServiceUsageAsync(long userId, long serviceId, int remainingSessions);
    }
}
