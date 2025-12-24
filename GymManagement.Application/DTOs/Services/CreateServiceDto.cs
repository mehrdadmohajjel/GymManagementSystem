using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.Services
{
    public class CreateServiceDto
    {
        public long GymId { get; set; }
        public string Name { get; set; } = null!;
        public ServiceType Type { get; set; }
        public decimal Price { get; set; }
        public int? SessionCount { get; set; }
        public int? DurationDays { get; set; }
    }

}
