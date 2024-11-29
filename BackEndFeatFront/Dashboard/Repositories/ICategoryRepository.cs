using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<CategoryItemDto>> GetCategories();
        Task<Category> InsertCategory(CategoryDto categoryDto);
        Task<Category> UpdateCategory(CategoryDto categoryDto);
        Task<string> RemoveCategory(int categoryId);
        Task<bool> UpdateCategoriesOrder(List<CategoryOrderDto> categories);
    }

}
