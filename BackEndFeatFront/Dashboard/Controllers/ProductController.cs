using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;
using Dashboard.Helpers;

namespace Dashboard.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly IProductService _productService;
    private readonly IWebHostEnvironment _environment;

    public ProductsController(IProductService productService,IWebHostEnvironment environment)
    {
      _productService = productService;
      _environment = environment;
    }



    [HttpPost("DeleteProducts")]
    public async Task<IActionResult> DeleteProducts([FromBody] List<int> productIds)
    {
      

      if (productIds == null || productIds.Count == 0)
      {
        var badResponse = new { message = "حذف با موفقیت انجام شد" };
        return BadRequest(badResponse);
      
      }

      await _productService.DeleteProducts(productIds);
    
      var response = new { message = "حذف با موفقیت انجام شد" };
      return Ok(response);
    }


    [HttpPost("UpdateProduct")]
    public async Task<IActionResult> UpdateProduct([FromForm] ProductMainDto productMainDto) {
      if(!productMainDto.CategoryId.HasValue)
      {
        return BadRequest("شماره دسته بندی درج نشده است");
      }
  
        var result= await _productService.UpdateProduct(productMainDto);
      if (result)
      {
                var response = new { message = "محصول با موفقیت ویرایش شد" };
                return Ok(response);

      }
      return BadRequest("اطلاعات وارد شده صحیح نمی باشد");
    } 

  [HttpGet("GetProductsWithFilter")]
    public async Task<ActionResult<IEnumerable<ProductWithDetailsDto>>> GetFilterProducts([FromQuery] ProductFilterParametersDto filterParams)
    {
      var products = await _productService.GetFilterProducts(filterParams);
      return Ok(products);
    }




    [HttpGet("GetProducts")]
    public async Task<ActionResult<IEnumerable<ProductWithDetailsDto>>> GetPaginatedProducts([FromQuery] int pageNumber, [FromQuery] int pageSize)
    {
      var products = await _productService.GetPaginatedProducts(pageNumber, pageSize);
      return Ok(products);
    }



    [HttpPost("InsertProduct")]
    public async Task<IActionResult> InsertProduct([FromForm] ProductDto productDto)
    {

      if (productDto.Image == null && (productDto.Gallery == null || !productDto.Gallery.Any()))
      {
        return BadRequest("تصویر و گالری درج نشده است");
      }

      var imagePath = "";
      var gallertPath=new List<string>();

      

      if (productDto.Image != null)
      {
         imagePath = await  ImageHelper.SaveImageAsync(productDto.Image,_environment);
  
      }

    
      if (productDto.Gallery != null && productDto.Gallery.Any())
      {
        foreach (var image in productDto.Gallery)
        {
           imagePath = await ImageHelper.SaveImageAsync(image,_environment);
           gallertPath.Add(imagePath);
      
        }
      }


      var result = await _productService.InsertProduct(productDto,imagePath,gallertPath);
      if(result is null) {
        return NotFound(new { data = new Object[] { },status=false });

      }
      var output = new
      {
        data = result,
        status = true,
      };

      return Ok(output);
    }

 
  }

}
