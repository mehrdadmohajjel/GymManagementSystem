using GymManagement.Domain.enums;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Utility
{
    public static class RoleExtensions
    {
        public static string GetDescription(this RoleType role)
        {
            var fieldInfo = role.GetType().GetField(role.ToString());
            var descriptionAttribute = (DescriptionAttribute)
                Attribute.GetCustomAttribute(fieldInfo, typeof(DescriptionAttribute));

            return descriptionAttribute?.Description ?? role.ToString();
        }
    }
}
