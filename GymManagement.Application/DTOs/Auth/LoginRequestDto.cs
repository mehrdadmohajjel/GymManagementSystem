using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Auth
{
    public class LoginRequestDto
    {
        public string NationalCode { get; set; }
        public string Password { get; set; }
    }

}
