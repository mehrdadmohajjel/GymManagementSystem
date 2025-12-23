using GymManagement.Domain.Entities;
namespace GymManagement.Infrastructure.Data
{
    public static class DbSeeder
    {
        public static void SeedRoles(AppDbContext context)
        {
            if (context.Roles.Any()) return;

            context.Roles.AddRange(
                new Role { Name = Roles.SystemAdmin },
                new Role { Name = Roles.GymAdmin },
                new Role { Name = Roles.Athlete }
            );

            context.SaveChanges();

        }
    }
}
