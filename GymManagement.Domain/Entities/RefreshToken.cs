namespace GymManagement.Domain.Entities
{
    public class RefreshToken : BaseEntity
    {
        public long UserId { get; set; }
        public string IpAddress { get; set; }
        public string UrlToken { get; set; }
        public DateTime ExpireDate { get; set; }
        public string RefreshTokenString { get; set; }

        public User User { get; set; }

        public bool IsRevoked { get; set; }
    }
}
