using Dashboard.DTOs;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CategoriesController : ControllerBase
  {
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
      _categoryService = categoryService;
    }

    [HttpGet("getCategories")]
    public async Task<IActionResult> GetCategories()
    { var categories = await _categoryService.GetCategories();
      return Ok(categories);
    }

    [HttpPost]
    public async Task<IActionResult> InsertCategory([FromBody] CategoryDto categoryDto)
    {
      var result = await _categoryService.InsertCategory(categoryDto);
      return Ok(result);
    }
  }

}
