using GymManagement.Application.DTOs.Auth;
using GymManagement.Application.DTOs.Users;
using GymManagement.Application.Interfaces;
using GymManagement.Domain.Entities;
using GymManagement.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace GymManagement.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly IRefreshToken _refresh;
        DateTime expire;

        public AuthService(AppDbContext context, IConfiguration config, IRefreshToken refresh)
        {
            _context = context;
            _config = config;
            _refresh = refresh;
        }

        public async Task<AuthResultDto> LoginAsync(LoginRequestDto dto, string clientIP)
        {
            var user = await _context.Users
                .Include(x => x.Role)
                .FirstOrDefaultAsync(x => x.NationalCode == dto.NationalCode);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("کد ملی یا رمز عبور اشتباه است");


            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Role, user.Role.Name),
    };

            // ✅ اضافه کردن GymId فقط اگر کاربر باشگاه دارد
            if (user.Id != null)
            {
                if (user.GymId != null)
                {
                    claims.Add(new Claim("gymId", user.Id.ToString()));
                }
                else
                {
                    claims.Add(new Claim("gymId", "0"));
                }

                claims.Add(new Claim("UserId", user.Id.ToString()));
                claims.Add(new Claim("UserRole", user.Role.Name.ToString()));
                claims.Add(new Claim("UserName", user.FirstName.ToString() + " " + user.LastName.ToString()));
            }


            AuthResultDto authResult = GenerateTokens(claims, null, DateTime.Now, clientIP, user.Id, user.Role.Name.ToString(), out expire);
            //var refreshToken = GenerateRefreshToken(user.Id);

            return authResult;
        }

        public AuthResultDto GenerateTokens(List<Claim> claims, dynamic? accessTokenExpiration, DateTime now, string clientIP, long userId, string UserRole, out DateTime tokenExpire)
        {

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            var expire = now.AddMinutes(_config["Jwt:AccessTokenMinutes"].ToInt());
            tokenExpire = now.AddDays(_config["Jwt:RefreshTokenDays"].ToInt());

            var jwtToken = new JwtSecurityToken(
                _config["JwtSetting:Issuer"],
                _config["JwtSetting:Audience"],
                claims,
                expires: expire,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256Signature));

            var accessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            var refreshToken = GenerateRefreshTokenString();
            var urlToken = GenerateUrlTokenString();
            var RefreshTokenItem = new RefreshToken
            {
                CreatedAt = DateTime.Now,
                ExpireDate = expire,
                IpAddress = clientIP,
                IsRevoked = false,
                RefreshTokenString = refreshToken,
                UrlToken = urlToken,
                UserId = userId
            };
            _refresh.CreateTokenAsync(RefreshTokenItem);
            return new AuthResultDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                UrlToken = urlToken,
                Role = UserRole
            };
        }
        private static string GenerateUrlTokenString()
        {
            return Guid.NewGuid().ToString("N");
        }
        private static string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
        private string GenerateJwtToken(User user)
        {

            if (user.Id != null)
            {

                var claims = new List<Claim>
                {
                    new Claim("userId", user.Id.ToString()),
                    new Claim("userRole", user.Role.Name),
                    new Claim("userName", $"{user.FirstName} {user.LastName}"),
                    new Claim("gymId", user.GymId?.ToString() ?? "0")
                   
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
            return String.Empty;
        }
        //private RefreshToken GenerateRefreshToken(long userId)
        //{
        //    var token = new RefreshToken
        //    {
        //        Token = Guid.NewGuid().ToString(),
        //        UserId = userId,
        //        ExpiryDate = DateTime.UtcNow.AddDays(
        //            int.Parse(_config["Jwt:RefreshTokenDays"])
        //        )
        //    };

        //    _context.RefreshTokens.Add(token);
        //    _context.SaveChanges();

        //    return token;
        //}

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)
        {
            var token = await _context.RefreshTokens
                .Include(x => x.User)
                .ThenInclude(x => x.Role)
                .FirstOrDefaultAsync(x => x.RefreshTokenString == refreshToken && !x.IsRevoked);

            if (token == null || token.ExpireDate < DateTime.UtcNow)
                throw new Exception("Refresh token نامعتبر است");

            return new AuthResponseDto
            {
                AccessToken = GenerateJwtToken(token.User),
                RefreshToken = token.RefreshTokenString,
                Role = token.User.Role.Name
            };
        }

        public async Task<UserListDto> UserInfo(long userId)
        {
            var user = await _context.Users
                            .Include(x => x.Role)
                            .FirstOrDefaultAsync(x => x.Id == userId);
            return new UserListDto
            {
                FullName = user.FirstName + ' ' + user.LastName,
                Id = user.Id,
                NationalCode = user.NationalCode,
                Role = user.Role.ToString(),
                WalletBalance = user.WalletBalance

            };
        }
    }
}




