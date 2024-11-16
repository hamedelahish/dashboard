using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Services
{
  public interface ICategoryService
  {
    Task<List<CategoryItemDto>> GetCategories();
    Task<Category> InsertCategory(CategoryDto categoryDto);
  }

}
