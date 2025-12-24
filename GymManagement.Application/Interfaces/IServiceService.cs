using GymManagement.Application.DTOs.Services;
using GymManagement.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IServiceService
    {
        Task<Service> CreateServiceAsync(CreateServiceDto dto);
        Task<UsersService> AssignServiceToUserAsync(AssignServiceDto dto);
        Task<List<UsersService>> GetUserServicesAsync(long userId);
        Task UseServiceSessionAsync(long userId, long serviceId); // کم کردن یک جلسه برای SessionBased
    }

}
