using GymManagement.Application.DTOs.Wallet;
using GymManagement.Application.DTOs.WhatsApp;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Domain.enums;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Services
{
    public class WalletService : IWalletService
    {
        private readonly AppDbContext _context;

        public WalletService(AppDbContext context)
        {
            _context = context;
        }

        public async Task ChargeAsync(ChargeWalletDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                throw new Exception("کاربر یافت نشد");

            user.WalletBalance += dto.Amount;

            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = dto.UserId,
                Amount = dto.Amount,
                Type = TransactionType.Charge,
                Description = dto.Description
            });

            await _context.SaveChangesAsync();
        }

        public async Task ConsumeAsync(ConsumeWalletDto dto)
        {
            var user = await _context.Users.FindAsync(dto.UserId);
            if (user == null)
                throw new Exception("کاربر یافت نشد");

            if (user.WalletBalance < dto.Amount)
                throw new Exception("موجودی کافی نیست");

            user.WalletBalance -= dto.Amount;

            _context.WalletTransactions.Add(new WalletTransaction
            {
                UserId = dto.UserId,
                Amount = dto.Amount,
                Type = TransactionType.Consume,
                Description = dto.Description
            });

            await _context.SaveChangesAsync();
        }

        public async Task<List<WalletTransactionDto>> GetTransactionsAsync(long userId)
        {
            return await _context.WalletTransactions
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .Select(x => new WalletTransactionDto
                {
                    Date = x.CreatedAt,
                    Amount = x.Amount,
                    Type = x.Type.ToString(),
                    Description = x.Description
                })
                .ToListAsync();
        }

    }

}
