using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.enums
{
    public enum RoleType
    {
        [Description("SystemAdmin")]
        SystemAdmin,

        [Description("GymAdmin")]
        GymAdmin,

        [Description("Athlete")]
        Athlete
    }
}
