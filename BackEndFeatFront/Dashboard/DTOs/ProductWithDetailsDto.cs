using Dashboard.Models;

namespace Dashboard.DTOs
{
  public class ProductWithDetailsDto
  {
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public long Price { get; set; }
    public int Stock { get; set; }
    public string CategoryName { get; set; }
    public int CategoryId { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime UpdateDate { get; set; }
    public List<GalleryListDto> Galleries { get; set; } = new List<GalleryListDto>();
  }


}
