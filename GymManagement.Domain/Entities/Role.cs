using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class Role : BaseEntity
    {
        public string Name { get; set; } // SystemAdmin, GymAdmin, Athlete
    }
}
