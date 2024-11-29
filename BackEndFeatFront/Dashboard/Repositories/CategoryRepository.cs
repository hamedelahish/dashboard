using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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
            var insertQuery = "InsertCategory";
            var parameters = new DynamicParameters();

            using (var connection = _context.CreateConnection())
            {
               
                if (categoryDto.ParentId != null)
                {
                    var checkDepthParameters = new DynamicParameters();
                    checkDepthParameters.Add("CategoryId", categoryDto.ParentId, DbType.Int32);
                    checkDepthParameters.Add("MaxDepth", 4, DbType.Int32);
                    checkDepthParameters.Add("IsValid", dbType: DbType.Boolean, direction: ParameterDirection.Output);

                    await connection.ExecuteAsync(
                        "CheckCategoryDepth",
                        checkDepthParameters,
                        commandType: CommandType.StoredProcedure
                    );

                    var isValid = checkDepthParameters.Get<bool>("IsValid");
                
                    if (!isValid)
                    {
                        throw new InvalidOperationException("عمق دسته‌بندی نمی‌تواند بیش از ۴ سطح باشد.");
                    }
                }

                CategoryDto lastCategory = null;
                if (categoryDto.ParentId == null)
                {
                    lastCategory = await connection.QueryFirstOrDefaultAsync<CategoryDto>(
                        "GetLastRootCategory",
                        commandType: CommandType.StoredProcedure
                    );
                }
                else
                {
                    lastCategory = await connection.QueryFirstOrDefaultAsync<CategoryDto>(
                        "GetLastSubCategory",
                        new { ParentId = categoryDto.ParentId },
                        commandType: CommandType.StoredProcedure
                    );
                }

                int nextCategoryOrder = (lastCategory?.CategoryOrder ?? 0) + 1;

                parameters.Add("ParentId", categoryDto.ParentId, DbType.Int32);
                parameters.Add("Name", categoryDto.Name, DbType.String);
                parameters.Add("Description", categoryDto.Description, DbType.String);
                parameters.Add("IsDeleted", categoryDto.IsDeleted, DbType.Boolean);
                parameters.Add("CreateDate", categoryDto.CreateDate == default ? DateTime.Now : categoryDto.CreateDate, DbType.DateTime);
                parameters.Add("UpdateDate", categoryDto.UpdateDate == default ? DateTime.Now : categoryDto.UpdateDate, DbType.DateTime);
                parameters.Add("CategoryOrder", nextCategoryOrder, DbType.Int32);

         
                try
                {
                    var result = await connection.QueryFirstOrDefaultAsync<Category>(insertQuery, parameters, commandType: CommandType.StoredProcedure);
                    return result;
                }
                catch (Exception ex)
                {
                    throw new Exception("Error inserting the category: " + ex.Message);
                }
            }
        }



        public async Task<Category> UpdateCategory(CategoryDto categoryDto)
        {
            var query = "UpdateCategory";
            var parameters = new DynamicParameters();
            parameters.Add("CategoryId", categoryDto.CategoryId, DbType.Int64);
            parameters.Add("Name", categoryDto.Name, DbType.String);
            parameters.Add("Description", categoryDto.Description, DbType.String);
            parameters.Add("IsDeleted", categoryDto.IsDeleted, DbType.Boolean);
            parameters.Add("UpdateDate", categoryDto.UpdateDate == default ? DateTime.Now : categoryDto.UpdateDate, DbType.DateTime);

            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<Category>(query, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<string> RemoveCategory(int categoryId)
        {

            var query = "RemoveCategory";
            var parameters = new DynamicParameters();
            parameters.Add("CategoryId", categoryId, DbType.Int32);

            using (var connection = _context.CreateConnection())
            {

                var result = await connection.QuerySingleAsync<string>(
                    "RemoveCategory",
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return result;
            }
        }

        public async Task<bool> UpdateCategoriesOrder(List<CategoryOrderDto> categories)
        {
            var query = "UpdateCategoriesOrder"; 
            var categoryTable = new DataTable();
            categoryTable.Columns.Add("Id", typeof(long));
            categoryTable.Columns.Add("ParentId", typeof(long));
            categoryTable.Columns.Add("CategoryOrder", typeof(int));

            foreach (var category in categories)
            {
                categoryTable.Rows.Add(category.Id, category.ParentId, category.CategoryOrder);
            }


            using (var connection = _context.CreateConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("Categories", categoryTable.AsTableValuedParameter("UpdateCategoryOrderTableType"));

                var result = await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
                return result > 0;

            }
        }

    }

}
