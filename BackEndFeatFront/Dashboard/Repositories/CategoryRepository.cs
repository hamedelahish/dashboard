using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Models;
using System.Data;

namespace Dashboard.Repositories
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly DapperContext _context;

    public CategoryRepository(DapperContext context)
    {
      _context = context;
    }


    public async Task<List<CategoryItemDto>> GetCategories()
    {
      using (var connection = _context.CreateConnection())
      {
        var query = "GetCategories";
        var result = await connection.QueryAsync<CategoryItemDto>(query, commandType: CommandType.StoredProcedure);

        // Convert flat list to hierarchical structure
        var categories = result.ToList();
        var lookup = categories.ToLookup(c => c.ParentId);

        foreach (var category in categories)
        {
          category.Children = lookup[category.Id].ToList();
        }

        return lookup[null].ToList();
      }
    }


    public async Task<Category> InsertCategory(CategoryDto categoryDto)
    {
      var query = "InsertCategory";
      var parameters = new DynamicParameters();
      parameters.Add("ParentId", categoryDto.ParentId, DbType.Int32);
      parameters.Add("Name", categoryDto.Name, DbType.String);
      parameters.Add("IsDeleted", categoryDto.IsDeleted, DbType.Boolean);
      parameters.Add("CreateDate", categoryDto.CreateDate == default ? DateTime.Now : categoryDto.CreateDate, DbType.DateTime);
      parameters.Add("UpdateDate", categoryDto.UpdateDate == default ? DateTime.Now : categoryDto.UpdateDate, DbType.DateTime);

      using (var connection = _context.CreateConnection())
      {
        var result = await connection.QueryFirstOrDefaultAsync<Category>(query, parameters, commandType: CommandType.StoredProcedure);
        return result;
      }
    }
  }

}
