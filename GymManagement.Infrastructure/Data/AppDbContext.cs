using GymManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Role> Roles => Set<Role>();
        public DbSet<Gym> Gyms => Set<Gym>();
        public DbSet<Service> Services => Set<Service>();
        public DbSet<WalletTransaction> WalletTransactions => Set<WalletTransaction>();
        public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
        public DbSet<PaymentGateway> PaymentGateways => Set<PaymentGateway>();
        public DbSet<OnlinePayment> OnlinePayments=> Set<OnlinePayment>();
        public DbSet<UsersService> UsersServices => Set<UsersService>();
        public DbSet<SmsSetting> SmsSettings => Set<SmsSetting>();
        public DbSet<GymSetting> GymSettings => Set<GymSetting>();
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(x => x.NationalCode)
                .IsUnique();
        }
    }
}
