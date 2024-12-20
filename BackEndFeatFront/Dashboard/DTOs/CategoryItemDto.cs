namespace Dashboard.DTOs
{
    public class CategoryItemDto
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public int CategoryOrder { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<CategoryItemDto> Children { get; set; } = new List<CategoryItemDto>();
    }
}
