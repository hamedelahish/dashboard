using System.ComponentModel.DataAnnotations;

namespace Dashboard.Models
{
  public class Product
  {

    public int Id { get; set; }
    public int CategoryId { get; set; }
    public string Name { get; set; }

    [StringLength(400)]
    public string Description { get; set; }

    public long Price { get; set; }

    public int Stock { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime CreateDate { get; set; }=DateTime.Now;
    public DateTime UpdateDate { get; set; } = DateTime.Now;


    public Category Category { get; set; }
    public ICollection<Gallery> Gallery { get; set; }





  }
}
