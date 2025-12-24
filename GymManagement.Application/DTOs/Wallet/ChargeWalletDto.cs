using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Wallet
{
    public class ChargeWalletDto
    {
        public long UserId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }

}
