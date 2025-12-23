using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NationalCode { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public string PasswordHash { get; set; }

        public long RoleId { get; set; }
        public Role Role { get; set; }

        public long? GymId { get; set; }
        public Gym Gym { get; set; }

        public decimal WalletBalance { get; set; }
    }

}
