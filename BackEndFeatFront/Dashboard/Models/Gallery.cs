namespace Dashboard.Models
{
  public class Gallery
  {
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Name { get; set; }
    public bool IsMain { get; set; }
    public bool IsDeleted { get; set; }=false;
    public DateTime CreateDate { get; set; }=DateTime.Now;
    public DateTime UpdateDate { get; set; }=DateTime.Now;
    public Product Product { get; set; }
    
  }


}
