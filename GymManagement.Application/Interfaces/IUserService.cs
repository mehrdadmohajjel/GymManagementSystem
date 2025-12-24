using GymManagement.Application.DTOs.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IUserService
    {
        Task RegisterAsync(RegisterUserDto dto);
        Task CreateUserAsync(CreateUserDto dto);
        Task<List<UserListDto>> GetUsersAsync(string role, long? gymId);
        Task ResetPasswordAsync(ResetPasswordDto dto);
    }

}
