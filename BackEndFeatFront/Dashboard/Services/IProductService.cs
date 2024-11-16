using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
  public interface IProductService

  {

    Task DeleteProducts(List<int> productIds);
    Task<bool> UpdateProduct(ProductMainDto productMainDto);
    Task<PagedResult<ProductWithDetailsDto>> GetFilterProducts(ProductFilterParametersDto filterParams);
    Task<PagedResult<ProductWithDetailsDto>> GetPaginatedProducts(int pageNumber, int pageSize);
    Task<Product> InsertProduct(ProductDto productDto,string imagePath,List<string> gallerPath);
  }

}
