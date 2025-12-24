using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Services
{
    public class AssignServiceDto
    {
        public long UserId { get; set; }
        public long ServiceId { get; set; }
        public int? SessionCount { get; set; } // اگر تغییر بدهیم
        public int? DurationDays { get; set; } // برای TimeBased
    }

}
