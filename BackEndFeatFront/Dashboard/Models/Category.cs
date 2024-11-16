namespace Dashboard.Models
{
  public class Category
  {
    public int Id { get; set; }
    public int? ParentId { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; } = false;
    public DateTime CreateDate { get; set; } = DateTime.Now;
    public DateTime UpdateDate { get; set; } = DateTime.Now;

    public ICollection<Product> Products { get; set; }

  }

}
