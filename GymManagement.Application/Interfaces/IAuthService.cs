using GymManagement.Application.DTOs.Auth;
using GymManagement.Application.DTOs.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto, string clientIP);
        public Task<UserListDto> UserInfo( long userId);

        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    }
}
