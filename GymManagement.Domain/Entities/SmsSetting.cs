using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class SmsSetting : BaseEntity
    {
        public long GymId { get; set; }
        public string ApiKey { get; set; } = null!;
        public string Sender { get; set; } = null!;


    }
}
