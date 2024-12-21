namespace Dashboard.DTOs
{
    public class UserPasswordDto
    {
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
    }
}
