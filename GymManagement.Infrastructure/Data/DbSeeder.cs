using GymManagement.Domain.Entities;
using GymManagement.Domain.enums;
using Utility;
namespace GymManagement.Infrastructure.Data
{
    public static class DbSeeder
    {
        public static void Seed(AppDbContext context)
        {
            SeedRoles(context);
            SeedSystemAdmin(context);
            SeedGyms(context);
            SeedPaymentGateways(context);
            SeedServices(context);
        }

        private static void SeedRoles(AppDbContext context)
        {
            if (context.Roles.Any()) return;

            var roles = new List<Role>
        {
            new Role { Name = RoleType.SystemAdmin.GetDescription() },
            new Role { Name = RoleType.GymAdmin.GetDescription() },
            new Role { Name = RoleType.Athlete.GetDescription() }
        };

            context.Roles.AddRange(roles);
            context.SaveChanges();
        }

        private static void SeedSystemAdmin(AppDbContext context)
        {
            if (context.Users.Any(u => u.Email == "admin@gym.com")) return;

            var adminRole = context.Roles.First(r => r.Name == RoleType.SystemAdmin.GetDescription());

            var user = new User
            {
                FirstName = "مهرداد",
                LastName = "محجل گلشنی",
                Email = "mehrdad.mohajjel@gmail.com",
                Mobile = "09143010428",
                NationalCode = "1381834191",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("4767997"),
                RoleId = adminRole.Id,
                BirthDate = new DateTime(1986, 1, 8)
            };

            context.Users.Add(user);
            context.SaveChanges();
        }

        private static void SeedGyms(AppDbContext context)
        {
            if (context.Gyms.Any()) return;

            var gyms = new List<Gym>
        {
            new Gym { Name = "Gym 1", Address = "Tehran",Code="001" },
            new Gym { Name = "Gym 2", Address = "Isfahan",Code="002" }
        };

            context.Gyms.AddRange(gyms);
            context.SaveChanges();
        }

        private static void SeedPaymentGateways(AppDbContext context)
        {
            if (context.PaymentGateways.Any()) return;

            var gyms = context.Gyms.ToList();

            foreach (var gym in gyms)
            {
                context.PaymentGateways.AddRange(
                    new PaymentGateway
                    {
                        GymId = gym.Id,
                        GatewayType = PaymentGatewayType.ZarinPal,
                        MerchantId = "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
                        CallbackUrl = "https://yourdomain.com/api/payments/verify",
                        IsActive = true
                    },
                    new PaymentGateway
                    {
                        GymId = gym.Id,
                        GatewayType = PaymentGatewayType.Mellat,
                        TerminalId = "XXXXXXXX",
                        Username = "username",
                        Password = "password",
                        CallbackUrl = "https://yourdomain.com/api/payments/verify",
                        IsActive = true
                    }
                );
            }

            context.SaveChanges();
        }

        private static void SeedServices(AppDbContext context)
        {
            if (context.Services.Any()) return;

            var gyms = context.Gyms.ToList();

            foreach (var gym in gyms)
            {
                context.Services.AddRange(
                    new Service
                    {
                        GymId = gym.Id,
                        Title = "Yoga Session 10 Pack",
                        Type = ServiceType.SessionBased,
                        Price = 500000,
                        SessionCount = 10,
                        IsActive = true
                    },
                    new Service
                    {
                        GymId = gym.Id,
                        Title = "Monthly Gym Access",
                        Type = ServiceType.TimeBased,
                        Price = 300000,
                        DurationDays = 30,
                        IsActive = true
                    }
                );
            }

            context.SaveChanges();
        }
    }
}
