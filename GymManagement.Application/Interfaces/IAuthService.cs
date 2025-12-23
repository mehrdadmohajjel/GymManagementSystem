using GymManagement.Application.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> LoginAsync(LoginRequestDto dto);
        Task<AuthResponseDto> RefreshTokenAsync(string refreshToken);
    }
}
