using GymManagement.Application.DTOs.Services;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Domain.enums;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace GymManagement.Application.Services
{
    public class ServiceService : IServiceService
    {
        private readonly AppDbContext _context;

        public ServiceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Service> CreateServiceAsync(CreateServiceDto dto)
        {
            var service = new Service
            {
                GymId = dto.GymId,
                Title = dto.Name,
                Type = dto.Type,
                Price = dto.Price,
                SessionCount = dto.Type == ServiceType.SessionBased ? dto.SessionCount : null,
                DurationDays = dto.Type == ServiceType.TimeBased ? dto.DurationDays : null
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return service;
        }

        public async Task<UsersService> AssignServiceToUserAsync(AssignServiceDto dto)
        {
            var service = await _context.Services.FindAsync(dto.ServiceId);
            if (service == null || !service.IsActive)
                throw new Exception("سرویس یافت نشد یا فعال نیست");

            var userService = new GymManagement.Domain.Entities.UsersService
            {
                UserId = dto.UserId,
                ServiceId = service.Id,
                StartDate = DateTime.UtcNow,
                EndDate = service.Type == ServiceType.TimeBased
                    ? DateTime.UtcNow.AddDays(dto.DurationDays ?? service.DurationDays ?? 0)
                    : null,
                RemainingSessions = service.Type == ServiceType.SessionBased
                    ? dto.SessionCount ?? service.SessionCount
                    : null
            };

            _context.UsersServices.Add(userService);
            await _context.SaveChangesAsync();
            return userService;
        }

        public async Task<List<UsersService>> GetUserServicesAsync(long userId)
        {
            return await _context.UsersServices
                .Include(x => x.Service)
                .Where(x => x.UserId == userId && x.IsActive)
                .ToListAsync();
        }

        public async Task UseServiceSessionAsync(long userId, long serviceId)
        {
            var userService = await _context.UsersServices
                .Include(x => x.Service)
                .FirstOrDefaultAsync(x => x.UserId == userId && x.ServiceId == serviceId && x.IsActive);

            if (userService == null) throw new Exception("سرویس یافت نشد یا فعال نیست");

            if (userService.Service.Type == ServiceType.SessionBased)
            {
                if (userService.RemainingSessions <= 0)
                    throw new Exception("جلسه‌ای باقی نمانده");

                userService.RemainingSessions--;
                if (userService.RemainingSessions == 0) userService.IsActive = false;
            }
            else if (userService.Service.Type == ServiceType.TimeBased)
            {
                if (userService.EndDate < DateTime.UtcNow)
                    userService.IsActive = false;
            }

            await _context.SaveChangesAsync();
        }

    
    }
}
