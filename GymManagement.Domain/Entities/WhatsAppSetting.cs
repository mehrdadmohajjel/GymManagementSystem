using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GymManagement.Domain.Entities
{
    public class WhatsAppSetting:BaseEntity
    {
        public long GymId { get; set; }
        public string ApiUrl { get; set; } = null!; // آدرس API واتس‌اپ (Webhook یا سرویس شخص ثالث)
        public string AccessToken { get; set; } = null!;
        public string SenderNumber { get; set; } = null!; // شماره ارسال کننده

    }
}
