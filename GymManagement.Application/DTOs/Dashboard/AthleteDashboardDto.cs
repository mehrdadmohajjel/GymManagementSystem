using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Dashboard
{
    public class AthleteDashboardDto
    {
        public decimal WalletBalance { get; set; }
        public int ActiveServices { get; set; }
        public int? RemainingSessions { get; set; }
        public DateTime? NearestServiceExpire { get; set; }
    }

}
