using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class OnlinePayment : BaseEntity
    {
        public long UserId { get; set; }
        public long GymId { get; set; }

        public decimal Amount { get; set; }
        public PaymentGatewayType GatewayType { get; set; }

        public string Authority { get; set; } // زرین‌پال
        public long? RefId { get; set; }       // ملت

        public bool IsSuccess { get; set; }
    }

}
