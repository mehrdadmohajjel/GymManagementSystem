using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class PaymentGateway : BaseEntity
    {
        public long GymId { get; set; }
        public PaymentGatewayType GatewayType { get; set; } 

        public string MerchantId { get; set; }

        public string TerminalId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public string CallbackUrl { get; set; }
        public bool IsActive { get; set; } = true;

    }
}
