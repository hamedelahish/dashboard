namespace Dashboard.DTOs
{
  public class GalleryItemDto
  {
    public int GalleryId { get; set; }
    public string GalleryUrl { get; set; }
    public IFormFile GalleryFile { get; set; }
    public bool IsMain { get; set; }
    public bool IsDeleted { get; set; }

  }

}
