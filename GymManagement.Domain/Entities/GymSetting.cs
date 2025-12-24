using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class GymSetting:BaseEntity
    {
        public long GymId { get; set; }
        public decimal MinWalletBalanceAlert { get; set; } = 500000; // ریال

    }
}
