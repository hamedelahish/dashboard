using System.ComponentModel.DataAnnotations;

namespace Dashboard.DTOs
{
    public class ChangePasswordDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        public string NewPassword { get; set; }
    }
}
