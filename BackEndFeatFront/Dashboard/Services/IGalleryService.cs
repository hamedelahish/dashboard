using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Services
{
  public interface IGalleryService
  {

    Task UpdateGalleryList(int productId, List<GalleryItemDto> galleryList);
    Task<Gallery> InsertGallery(GalleryDto galleryDto);
  }

}
