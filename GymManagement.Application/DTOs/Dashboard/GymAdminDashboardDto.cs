using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Dashboard
{
    public class GymAdminDashboardDto
    {
        public int TotalAthletes { get; set; }
        public int ActiveServices { get; set; }
        public decimal TotalWalletBalance { get; set; }
        public int TodayServiceUsages { get; set; }
    }

}
