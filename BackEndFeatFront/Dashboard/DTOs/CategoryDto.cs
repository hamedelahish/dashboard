namespace Dashboard.DTOs
{
  public class CategoryDto
  {
    public int? ParentId { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
  }

}
