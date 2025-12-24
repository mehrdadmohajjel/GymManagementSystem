using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Users
{
    public class ResetPasswordDto
    {
        public string NationalCode { get; set; }
        public string NewPassword { get; set; }
    }
}
