using GymManagement.Application.DTOs.Gyms;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Services
{
    public class RefreshTokenService : IRefreshToken
    {
        private readonly AppDbContext _context;

        public RefreshTokenService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateTokenAsync(RefreshToken dto)
        {
            _context.RefreshTokens.Add(dto);
            await _context.SaveChangesAsync();
        }
    }
}
