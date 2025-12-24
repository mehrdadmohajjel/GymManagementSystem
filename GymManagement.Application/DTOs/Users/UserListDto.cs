using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Users
{
    public class UserListDto
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public string NationalCode { get; set; }
        public string Role { get; set; }
        public decimal WalletBalance { get; set; }
    }
}
