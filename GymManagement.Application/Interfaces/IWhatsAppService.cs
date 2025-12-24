using GymManagement.Application.DTOs.WhatsApp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Application.Interfaces
{
    public interface IWhatsAppService
    {
        Task SendWhatsAppAsync(SendWhatsAppDto dto);
    }
}
