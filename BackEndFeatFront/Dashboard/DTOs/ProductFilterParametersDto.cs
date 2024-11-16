namespace Dashboard.DTOs
{
  public class ProductFilterParametersDto
  {
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string Name { get; set; }
    public int? CategoryID { get; set; }
    public decimal? PriceFrom { get; set; }
    public decimal? PriceTo { get; set; }
    public int? Stock { get; set; }
  }

}
