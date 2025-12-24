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
        public int? SessionCount { get; set; } // فقط برای SessionBased
        public int? DurationDays { get; set; } // فقط برای TimeBased
        public bool IsActive { get; set; } = true;

        public long GymId { get; set; }
        public Gym Gym { get; set; } = null!;
        public ICollection<UsersService> UserServices { get; set; } = new List<UsersService>();

    }
}
