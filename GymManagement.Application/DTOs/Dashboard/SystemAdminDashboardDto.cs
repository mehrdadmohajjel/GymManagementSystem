using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Dashboard
{
    public class SystemAdminDashboardDto
    {
        public int TotalGyms { get; set; }
        public int TotalUsers { get; set; }
        public int TotalAthletes { get; set; }
        public decimal TotalWalletBalance { get; set; }
        public int TodayPaymentsCount { get; set; }
    }

}
