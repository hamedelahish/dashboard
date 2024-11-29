namespace Dashboard.DTOs
{
    public class CategoryOrderDto
    {
        public long Id { get; set; }
        public long? ParentId { get; set; }
        public int CategoryOrder { get; set; }
    }

}
