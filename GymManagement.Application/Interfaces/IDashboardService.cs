using GymManagement.Application.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IDashboardService
    {
        Task<SystemAdminDashboardDto> GetSystemAdminAsync();
        Task<GymAdminDashboardDto> GetGymAdminAsync(long gymId);
        Task<AthleteDashboardDto> GetAthleteAsync(long userId);
    }
}
