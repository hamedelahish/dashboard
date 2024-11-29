using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryItemDto>> GetCategories();
        Task<Category> InsertCategory(CategoryDto categoryDto);
        Task<Category> UpdateCategory(CategoryDto categoryDto);
        Task<string> RemoveCategory(int categoryId);
        Task<bool> UpdateCategoriesOrder(List<CategoryOrderDto> categories);
    }

}
