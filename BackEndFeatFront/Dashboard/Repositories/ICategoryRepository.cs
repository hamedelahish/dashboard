using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
  public interface ICategoryRepository
  {
    Task<List<CategoryItemDto>> GetCategories();
    Task<Category> InsertCategory(CategoryDto categoryDto);
  }

}
