using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.DTOs.WhatsApp
{
    public class SendWhatsAppDto
    {
        public long GymId { get; set; }
        public string Mobile { get; set; } = null!;
        public string Message { get; set; } = null!;
    }
}
