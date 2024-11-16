using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Repositories;

namespace Dashboard.Services
{
  public class GalleryService : IGalleryService
  {
    private readonly IGalleryRepository _galleryRepository;

    public GalleryService(IGalleryRepository galleryRepository)
    {
      _galleryRepository = galleryRepository;
    }

    public async Task UpdateGalleryList(int productId, List<GalleryItemDto> galleryList)
    {
      await _galleryRepository.UpdateGalleryList(productId, galleryList);
     

    }
    public async Task<Gallery> InsertGallery(GalleryDto galleryDto)
    {
      return await _galleryRepository.InsertGallery(galleryDto);
    }
  }

}
