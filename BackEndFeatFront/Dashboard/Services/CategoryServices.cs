using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Repositories;

namespace Dashboard.Services
{
  public class CategoryService : ICategoryService
  {
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
      _categoryRepository = categoryRepository;
    }


    public async Task<List<CategoryItemDto>> GetCategories()
    {
      return await _categoryRepository.GetCategories();
    }

    public async Task<Category> InsertCategory(CategoryDto categoryDto)
    {
      return await _categoryRepository.InsertCategory(categoryDto);
    }
  }

}
