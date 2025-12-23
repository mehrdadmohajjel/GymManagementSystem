using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class Service : BaseEntity
    {
        public string Title { get; set; }
        public ServiceType Type { get; set; }
        public decimal Price { get; set; }
        public int? DurationDays { get; set; }

        public long GymId { get; set; }
    }
}
