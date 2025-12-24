using GymManagement.Application.DTOs.Gyms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IGymService
    {
        Task CreateGymAsync(CreateGymDto dto);
        Task AssignGymAdminAsync(AssignGymAdminDto dto);
        Task<List<GymListDto>> GetGymsAsync();
    }
}
