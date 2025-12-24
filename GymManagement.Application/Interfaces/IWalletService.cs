using GymManagement.Application.DTOs.Wallet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IWalletService
    {
        Task ChargeAsync(ChargeWalletDto dto);
        Task ConsumeAsync(ConsumeWalletDto dto);
        Task<List<WalletTransactionDto>> GetTransactionsAsync(long userId);
    }

}
