using GymManagement.Application.Constants;
using GymManagement.Application.DTOs.Users;
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
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task RegisterAsync(RegisterUserDto dto)
        {
            if (await _context.Users.AnyAsync(x => x.NationalCode == dto.NationalCode))
                throw new Exception("کاربر با این کد ملی وجود دارد");

            var roleId = await _context.Roles
                .Where(x => x.Name == Roles.Athlete)
                .Select(x => x.Id)
                .FirstAsync();

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                NationalCode = dto.NationalCode,
                Mobile = dto.Mobile,
                Email = dto.Email,
                BirthDate = dto.BirthDate,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                RoleId = roleId,
                WalletBalance = 0
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task CreateUserAsync(CreateUserDto dto)
        {
            var roleId = await _context.Roles
                .Where(x => x.Name == dto.Role)
                .Select(x => x.Id)
                .FirstAsync();

            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                NationalCode = dto.NationalCode,
                Mobile = dto.Mobile,
                Email = dto.Email,
                BirthDate = dto.BirthDate,
                RoleId = roleId,
                GymId = dto.GymId,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("123456"),
                WalletBalance = 0
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<UserListDto>> GetUsersAsync(string role, long? gymId)
        {
            var query = _context.Users.Include(x => x.Role).AsQueryable();

            if (!string.IsNullOrEmpty(role))
                query = query.Where(x => x.Role.Name == role);

            if (gymId.HasValue)
                query = query.Where(x => x.GymId == gymId);

            return await query.Select(u => new UserListDto
            {
                Id = u.Id,
                FullName = u.FirstName + " " + u.LastName,
                NationalCode = u.NationalCode,
                Role = u.Role.Name,
                WalletBalance = u.WalletBalance
            }).ToListAsync();
        }

        public async Task ResetPasswordAsync(ResetPasswordDto dto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.NationalCode == dto.NationalCode);

            if (user == null)
                throw new Exception("کاربر یافت نشد");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _context.SaveChangesAsync();
        }
    }

}
