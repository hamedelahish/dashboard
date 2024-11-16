using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Dashboard.Helpers
{
  public static class ImageHelper
  {
    public static async Task<string> SaveImageAsync(IFormFile image, IWebHostEnvironment environment)
    {
      var uploadsFolder = Path.Combine(environment.WebRootPath, "src/assets/images");
      Directory.CreateDirectory(uploadsFolder);
      var extension = Path.GetExtension(image.FileName);
      var uniqueFileName = Guid.NewGuid().ToString() + extension;
      var filePath = Path.Combine(uploadsFolder, uniqueFileName);

      using (var fileStream = new FileStream(filePath, FileMode.Create))
      {
        await image.CopyToAsync(fileStream);
      }

      return Path.Combine("src/assets/images", uniqueFileName);
    }
  }
}
