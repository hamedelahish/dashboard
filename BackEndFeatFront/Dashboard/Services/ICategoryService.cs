using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryItemDto>> GetCategories();
        Task<Category> InsertCategory(CategoryDto categoryDto);
        Task<Category> UpdateCategory(CategoryDto categoryDto);
        Task<string> RemoveCategory(int categoryId);
    }

}
