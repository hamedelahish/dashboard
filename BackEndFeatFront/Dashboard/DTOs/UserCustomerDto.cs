namespace Dashboard.DTOs
{
    public class UserCustomerDto
    {
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
        public int RoleId { get; set; }
       
    }
}
