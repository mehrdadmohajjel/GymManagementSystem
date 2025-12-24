using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class UsersService : BaseEntity
    {
        public long UserId { get; set; }
        public long ServiceId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; } // برای TimeBased
        public int? RemainingSessions { get; set; } // برای SessionBased
        public bool IsActive { get; set; } = true;

        public User User { get; set; } = null!;
        public Service Service { get; set; } = null!;

    }
}
