using Dashboard.DTOs;
using Dashboard.Helpers;
using Dashboard.Models;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Dashboard.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class GalleriesController : ControllerBase
  {
    private readonly IGalleryService _galleryService;
    private readonly IWebHostEnvironment _environment;

    public GalleriesController(IGalleryService galleryService,IWebHostEnvironment environment)
    {
      _galleryService = galleryService;
      _environment = environment;

    }


   
    [HttpPost("updateGallery")]
    public async Task<IActionResult> UpdateGallery([FromForm]  int productId, [FromForm] List<GalleryItemDto> galleryList)
    {
      if (galleryList == null || galleryList.Count == 0)
      {
        return BadRequest("اطلاعات وارد شده صحیح نیست");
      }

      var itemsWithFile = new List<GalleryItemDto>();
      var itemsWithOutFile = new List<GalleryItemDto>();

      foreach (var item in galleryList)
      {
        if(item.GalleryFile != null && item.GalleryFile.Length> 0)
        {
          itemsWithFile.Add(item);
        }
        else
        {
          itemsWithOutFile.Add(item);
        }

      }

      foreach (var item in itemsWithFile)
      {
        item.GalleryUrl =await ImageHelper.SaveImageAsync(item.GalleryFile, _environment);

        var gallery = new GalleryDto
        {
          ProductId = productId,
          Name = Path.GetFileName(item.GalleryUrl),
          IsMain = item.IsMain
        };
        await _galleryService.InsertGallery(gallery);
      }

 

      await _galleryService.UpdateGalleryList(productId, itemsWithOutFile);
      return Ok("گالری با موفقیت آپدیت شد");
    }


  }
}
