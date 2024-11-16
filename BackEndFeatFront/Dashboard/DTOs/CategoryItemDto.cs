namespace Dashboard.DTOs
{
  public class CategoryItemDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public int? ParentId { get; set; }
    public List<CategoryItemDto> Children { get; set; } = new List<CategoryItemDto>();
  }
}
