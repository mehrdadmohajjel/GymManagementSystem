using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Dashboard;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.enums;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utility;

namespace GymManagement.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly AppDbContext _context;

        public DashboardService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SystemAdminDashboardDto> GetSystemAdminAsync()
        {
            return new SystemAdminDashboardDto
            {
                TotalGyms = await _context.Gyms.CountAsync(),
                TotalUsers = await _context.Users.CountAsync(),
                TotalAthletes = await _context.Users.CountAsync(x => x.Role.Name == Roles.Athlete),
                TotalWalletBalance = await _context.Users.SumAsync(x => x.WalletBalance),
                TodayPaymentsCount = await _context.OnlinePayments.CountAsync(x =>
                    x.IsSuccess && x.PaidAt!.Value.Date == DateTime.Today)
            };
        }

        public async Task<GymAdminDashboardDto> GetGymAdminAsync(long gymId)
        {
            return new GymAdminDashboardDto
            {
                TotalAthletes = await _context.Users.CountAsync(x =>
                    x.GymId == gymId && x.Role.Name == Roles.Athlete),

                ActiveServices = await _context.Services.CountAsync(x =>
                    x.GymId == gymId && x.IsActive),

                TotalWalletBalance = await _context.Users
                    .Where(x => x.GymId == gymId)
                    .SumAsync(x => x.WalletBalance),

                TodayServiceUsages = await _context.UsersServices.CountAsync(x =>
                    x.User.GymId == gymId && x.CreatedAt.Date == DateTime.Today)
            };
        }

        public async Task<AthleteDashboardDto> GetAthleteAsync(long userId)
        {
            var wallet = await _context.Users.FirstAsync(x => x.Id == userId);

            var services = await _context.UsersServices
                .Where(x => x.UserId == userId && x.IsActive)
                .ToListAsync();

            return new AthleteDashboardDto
            {
                WalletBalance = wallet.WalletBalance,
                ActiveServices = services.Count,
                RemainingSessions = services.Sum(x => x.RemainingSessions),
                NearestServiceExpire = services
                    .Where(x => x.EndDate != null)
                    .OrderBy(x => x.EndDate)
                    .Select(x => x.EndDate)
                    .FirstOrDefault()
            };
        }
    }

}
