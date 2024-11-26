using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard.Models
{
    public class Category
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string Name { get; set; }
        [Column(TypeName = "nvarchar(400)")]
        public string Description { get; set; }
        public bool IsDeleted { get; set; } = false;
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public DateTime UpdateDate { get; set; } = DateTime.Now;

        public ICollection<Product> Products { get; set; }

    }

}
