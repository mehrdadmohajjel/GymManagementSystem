using GymManagement.Application.DTOs.Auth;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace GymManagement.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<AuthResponseDto> LoginAsync(LoginRequestDto dto)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.NationalCode == dto.NationalCode);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("کد ملی یا رمز عبور اشتباه است");

            var accessToken = GenerateJwtToken(user);
            var refreshToken = GenerateRefreshToken(user.Id);

            return new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken.Token,
                Role = user.Role.Name
            };
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.Name)
        };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"])
            );

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(
                    int.Parse(_config["Jwt:AccessTokenMinutes"])
                ),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private RefreshToken GenerateRefreshToken(long userId)
        {
            var token = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                UserId = userId,
                ExpiryDate = DateTime.UtcNow.AddDays(
                    int.Parse(_config["Jwt:RefreshTokenDays"])
                )
            };

            _context.RefreshTokens.Add(token);
            _context.SaveChanges();

            return token;
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var token = await _context.RefreshTokens
                .Include(x => x.User)
                .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(x => x.Token == refreshToken && !x.IsRevoked);

            if (token == null || token.ExpiryDate < DateTime.UtcNow)
                throw new Exception("Refresh token نامعتبر است");

            return new AuthResponseDto
            {
                AccessToken = GenerateJwtToken(token.User),
                RefreshToken = token.Token,
                Role = token.User.Role.Name
            };
        }
    }

}
