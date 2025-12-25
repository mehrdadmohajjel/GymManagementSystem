using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Gyms;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Services
{
    public class GymService : IGymService
    {
        private readonly AppDbContext _context;

        public GymService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateGymAsync(CreateGymDto dto)
        {
            if (await _context.Gyms.AnyAsync(x => x.Code == dto.Code))
                throw new Exception("کد باشگاه تکراری است");

            var gym = new Gym
            {
                Name = dto.Name,
                Code = dto.Code
            };

            _context.Gyms.Add(gym);
            await _context.SaveChangesAsync();
        }

        public async Task AssignGymAdminAsync(AssignGymAdminDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                throw new Exception("کاربر یافت نشد");

            user.GymId = dto.GymId;
            user.RoleId = await _context.Roles
                .Where(x => x.Name == Roles.GymAdmin)
                .Select(x => x.Id)
                .FirstAsync();

            await _context.SaveChangesAsync();
        }

        public async Task<List<GymListDto>> GetGymsAsync()
        {
            return await _context.Gyms
                .Select(g => new GymListDto
                {
                    Id = g.Id,
                    Name = g.Name,
                    Code = g.Code,
                    AdminFullName = _context.Users
                        .Where(u => u.GymId == g.Id && u.Role.Name == Roles.GymAdmin)
                        .Select(u => u.FirstName + " " + u.LastName)
                        .FirstOrDefault()
                })
                .ToListAsync();
        }
        public async Task<long> GetUserGymAsync(long userId)
        {
            var user = await _context.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
                throw new Exception("User not found");

            return (long)user.GymId;
            
        }
    }

}
