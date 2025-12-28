using GymManagement.Application.DTOs.Gyms;
using GymManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IRefreshToken
    {
        Task CreateTokenAsync(RefreshToken dto);

    }
}
