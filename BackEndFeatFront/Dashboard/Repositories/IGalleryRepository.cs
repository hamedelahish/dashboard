using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
  public interface IGalleryRepository
  {

    Task UpdateGalleryList(int productId, List<GalleryItemDto> galleryList);
    Task<Gallery> InsertGallery(GalleryDto galleryDto);
  }

}
