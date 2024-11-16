using Dapper;
using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.IO;

namespace Dashboard.Services
{
  public class ProductService : IProductService
  {
    private readonly IProductRepository _productRepository;
    private readonly IGalleryRepository _galleryRepository;

    public ProductService(IProductRepository productRepository,IGalleryRepository galleryRepository)
    {
      _productRepository = productRepository;
      _galleryRepository = galleryRepository;
      
    }


    public async Task DeleteProducts(List<int> productIds)
    {

      await _productRepository.DeleteProducts(productIds);

    }


    public async Task<bool> UpdateProduct(ProductMainDto productMainDto)
    {
       await _productRepository.UpdateProduct(productMainDto);
      return true;
    }
    public async Task<PagedResult<ProductWithDetailsDto>> GetFilterProducts(ProductFilterParametersDto filterParams)
    {
      return await _productRepository.GetFilterProducts(filterParams);
    }

    public async Task<PagedResult<ProductWithDetailsDto>> GetPaginatedProducts(int pageNumber, int pageSize)
    {
      return await _productRepository.GetPaginatedProducts(pageNumber, pageSize);
       }

      public async Task<Product> InsertProduct(ProductDto productDto,string imagePath,List<string> galleryPath)
    {
      var product= await _productRepository.InsertProduct(productDto,imagePath,galleryPath);

      if (product != null) {

        var image = new GalleryDto
        {
          ProductId = product.Id,
          Name = Path.GetFileName(imagePath),
          IsMain = true
        };
        await _galleryRepository.InsertGallery(image);


        foreach (var path in galleryPath)
        {
          var gallery = new GalleryDto
          {
            ProductId = product.Id,
            Name = Path.GetFileName(path),
            IsMain = false
          };
          await _galleryRepository.InsertGallery(gallery);


        }

      }


      return product;
    }

 
  }

}
