using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Data;
using System.Transactions;

namespace Dashboard.Repositories
{
  public class ProductRepository : IProductRepository
  {
    private readonly DapperContext _context;

    public ProductRepository(DapperContext context)
    {
      _context = context;
    }



    public async Task DeleteProducts(List<int> productIds)
    {
      using (var connection = _context.CreateConnection())
      {
        var query = "DeleteProducts";
        var productIdsTable = new DataTable();
        productIdsTable.Columns.Add("Value", typeof(int));

        foreach (var id in productIds)
        {
          productIdsTable.Rows.Add(id);
        }

        var parameters = new DynamicParameters();
        parameters.Add("@ProductIds", productIdsTable.AsTableValuedParameter("dbo.IntList"));

        await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
      }
    }



    public async Task UpdateProduct(ProductMainDto productMainDto)
    {
      using (var connection = _context.CreateConnection())
      {
        var query = "UpdateProduct";
        var parameters = new DynamicParameters();
        parameters.Add("@ProductId", productMainDto.ProductId);
        parameters.Add("@CategoryId", productMainDto.CategoryId.HasValue ? productMainDto.CategoryId.Value : (int?)null); 
        parameters.Add("@Name", !string.IsNullOrEmpty(productMainDto.Name) ? productMainDto.Name : null);  
        parameters.Add("@Description", !string.IsNullOrEmpty(productMainDto.Description) ? productMainDto.Description : null); 
        parameters.Add("@Price", productMainDto.Price != 0 ? productMainDto.Price : (long?)null);  
        parameters.Add("@Stock", productMainDto.Stock != 0 ? productMainDto.Stock : (int?)null);  

        await connection.ExecuteAsync(query,parameters,commandType: CommandType.StoredProcedure);


      }
    }
    public async Task<PagedResult<ProductWithDetailsDto>> GetFilterProducts(ProductFilterParametersDto filterParams)
    {
      using (var connection = _context.CreateConnection())
      {
        var query = "GetProductsWithFilter";
        var parameters = new DynamicParameters();
        if (!string.IsNullOrEmpty(filterParams.Name))
          parameters.Add("@Name", filterParams.Name);

        if (filterParams.CategoryID.HasValue)
          parameters.Add("@CategoryID", filterParams.CategoryID);

        if (filterParams.PriceFrom.HasValue)
          parameters.Add("@PriceFrom", filterParams.PriceFrom);

        if (filterParams.PriceTo.HasValue)
          parameters.Add("@PriceTo", filterParams.PriceTo);

        if (filterParams.Stock.HasValue)
          parameters.Add("@Stock", filterParams.Stock);

        var productDictionary = new Dictionary<int, ProductWithDetailsDto>();
        PagedResult<ProductWithDetailsDto> pagedResult = new PagedResult<ProductWithDetailsDto>
        {
          PageNumber = filterParams.PageNumber,
          PageSize = filterParams.PageSize,
          Items = new List<ProductWithDetailsDto>()
        };

        using (var multi = await connection.QueryMultipleAsync(query, parameters, commandType: CommandType.StoredProcedure))
        {
          var products = multi.Read<ProductWithDetailsDto, GalleryListDto, ProductWithDetailsDto>(
              (product, gallery) =>
              {
                if (!productDictionary.TryGetValue(product.ProductId, out var productEntry))
                {
                  productEntry = product;
                  productEntry.Galleries = new List<GalleryListDto>(); // Initialize Galleries list
                  productDictionary[product.ProductId] = productEntry;
                }

                if (gallery != null)
                {
                  productEntry.Galleries.Add(gallery);
                }

                return productEntry;
              },
              splitOn: "GalleryId");

          var groupedProducts = products.GroupBy(p => p.ProductId).Select(g => g.First()).ToList();

          pagedResult.Items = groupedProducts.Skip((filterParams.PageNumber - 1) * filterParams.PageSize)
                                      .Take(filterParams.PageSize)
                                      .ToList();

          pagedResult.Total = multi.ReadSingle<int>();
        }

        return pagedResult;
      }
    }


    public async Task<PagedResult<ProductWithDetailsDto>> GetPaginatedProducts(int pageNumber, int pageSize)
    {
      using (var connection = _context.CreateConnection())
      {
        var query = "GetProductsWithDetails";
        var parameters = new DynamicParameters();
        parameters.Add("@PageNumber", pageNumber);
        parameters.Add("@PageSize", pageSize);

        var productDictionary = new Dictionary<int, ProductWithDetailsDto>();
        PagedResult<ProductWithDetailsDto> pagedResult = new PagedResult<ProductWithDetailsDto>
        {
          PageNumber = pageNumber,
          PageSize = pageSize,
          Items = new List<ProductWithDetailsDto>()
        };

        using (var multi = await connection.QueryMultipleAsync(query, parameters, commandType: CommandType.StoredProcedure))
        {
          var products = multi.Read<ProductWithDetailsDto, GalleryListDto, ProductWithDetailsDto>(
              (product, gallery) =>
              {
                if (!productDictionary.TryGetValue(product.ProductId, out var productEntry))
                {
                  productEntry = product;
                  productDictionary[product.ProductId] = productEntry;
                }

                if (gallery != null)
                {
                  productEntry.Galleries.Add(gallery);
                }

                return productEntry;
              },
              splitOn: "GalleryId");

          pagedResult.Items = products.Distinct().ToList();

          pagedResult.Total = multi.ReadSingle<int>();
        }

        return pagedResult;
      }
    }


    public async Task<Product> InsertProduct(ProductDto productDto,string imagePath,List<string> gallerPath)
    {
      var query = "InsertProduct";
      var parameters = new DynamicParameters();
      parameters.Add("CategoryId", productDto.CategoryId, DbType.Int32);
      parameters.Add("Name", productDto.Name, DbType.String);
      parameters.Add("Description", productDto.Description, DbType.String);
      parameters.Add("Price", productDto.Price, DbType.Int64);
      parameters.Add("Stock", productDto.Stock, DbType.Int32);

      using (var connection = _context.CreateConnection())
      {
        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {

          try
          {
            var result = await connection.QueryFirstOrDefaultAsync<Product>(query, parameters, commandType: CommandType.StoredProcedure);

            if (result != null)
            {
              result.Category = await GetCategoryById(result.CategoryId);
     
            }

            transaction.Complete();
            return result;
          }
          catch (Exception x)
          {
           
            return null;
          }
        }

      }
    }


    private async Task<Category> GetCategoryById(int categoryId)
    {
      var query = "SELECT * FROM Categories WHERE Id = @Id";
      using (var connection = _context.CreateConnection())
      {
        return await connection.QueryFirstOrDefaultAsync<Category>(query, new { Id = categoryId });
      }
    }

    private async Task<Gallery> GetGalleryById(int galleryId)
    {
      var query = "SELECT * FROM Galleries WHERE Id = @Id";
      using (var connection = _context.CreateConnection())
      {
        return await connection.QueryFirstOrDefaultAsync<Gallery>(query, new { Id = galleryId });
      }
    }

 
  }

}
