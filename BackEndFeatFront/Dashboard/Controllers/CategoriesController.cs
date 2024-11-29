using Dashboard.DTOs;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

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
        {
            var categories = await _categoryService.GetCategories();
            return Ok(categories);
        }
        [HttpPost("InsertCategory")]
        public async Task<IActionResult> InsertCategory([FromForm] CategoryDto categoryDto)
        {
            try
            {
                var result = await _categoryService.InsertCategory(categoryDto);
                return Ok(result); 
            }
            catch (InvalidOperationException ex)
            {
             
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, new { message = "خطا در ایجاد دسته بندی "});
            }
        }


        [HttpPost("UpdateCategory")]
        public async Task<IActionResult> UpdateCategory([FromForm] CategoryDto categoryDto)
        {
            var result = await _categoryService.UpdateCategory(categoryDto);
            return Ok(result);
        }

        [HttpPost("RemoveCategory")]
        public async Task<IActionResult> RemoveCategory([FromForm] int categoryId)
        {
            try
            {
                var result = await _categoryService.RemoveCategory(categoryId);
                return Ok(new { message = result });
            }
            catch (SqlException ex) when (ex.Number == 50000)
            {
                
                return BadRequest(new { error = ex.Message });
            }
            catch (SqlException ex)
            {
                
                return StatusCode(500, new { error = "An unexpected database error occurred.", details = ex.Message });
            }
        }

        [HttpPost("UpdateCategoriesOrder")]
        public async Task<IActionResult> UpdateCategoriesOrder([FromBody] List<CategoryOrderDto> categories)
        {
            if (categories == null || categories.Count == 0)
            {
                return BadRequest("دسته بندی جهت ویرایش وجود ندارد");
            }

            var result = await _categoryService.UpdateCategoriesOrder(categories);
            return result ? Ok("ترتیب دسته بندی با موفقیت ویرایش شد") : BadRequest("خطا در ویرایش ترتیب دسته بندی");
        }

    }



}
