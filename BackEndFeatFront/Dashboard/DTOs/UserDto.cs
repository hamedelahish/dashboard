namespace Dashboard.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string RoleName { get; set; }
        public DateTime CreateDate { get; set; }
    }

}
