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
        public User User { get; set; } = null!;

        public long GymId { get; set; }

        public decimal Amount { get; set; }

        public PaymentGatewayType GatewayType { get; set; }

        public string? Authority { get; set; }
        public string? RefId { get; set; }

        public bool IsSuccess { get; set; }

        public DateTime? PaidAt { get; set; }   
    }

}
