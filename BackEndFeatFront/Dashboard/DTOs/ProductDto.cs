namespace Dashboard.DTOs
{
  public class ProductDto
  {
    public int CategoryId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public IFormFile Image { get; set; }
    public List<IFormFile> Gallery { get; set; }
  
 
  }

}
