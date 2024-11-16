using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dashboard.Repositories
{
  public interface IProductRepository
  {

    Task DeleteProducts(List<int> productIds);
    Task UpdateProduct(ProductMainDto productMainDto);
    Task<PagedResult<ProductWithDetailsDto>> GetFilterProducts(ProductFilterParametersDto filterParams);
    Task<PagedResult<ProductWithDetailsDto>> GetPaginatedProducts(int pageNumber, int pageSize);
    Task<Product> InsertProduct(ProductDto productDto, string imagePath, List<string> galleryPath);
  }
}
