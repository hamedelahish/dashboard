using System.ComponentModel.DataAnnotations;

namespace Dashboard.Models
{
    public class OrderStatus
    {
        public int StatusId { get; set; }

        [Required]
        [MaxLength(50)]
        public string StatusName { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; } = DateTime.Now;
    }
}
