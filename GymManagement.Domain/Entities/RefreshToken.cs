using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class RefreshToken : BaseEntity
    {
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }

        public bool IsRevoked { get; set; }
    }
}
