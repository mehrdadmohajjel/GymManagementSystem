using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class WalletTransaction : BaseEntity
    {
        public long UserId { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public string Description { get; set; }
    }
}
