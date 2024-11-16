using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Models;
using System.Data;

namespace Dashboard.Repositories
{
    public class GalleryRepository : IGalleryRepository
    {
        private readonly DapperContext _context;

        public GalleryRepository(DapperContext context)
        {
            _context = context;
        }

        public async Task UpdateGalleryList(int productId, List<GalleryItemDto> galleryList)
        {
            using (var connection = _context.CreateConnection())
            {
                foreach (var galleryItem in galleryList)
                {
                    var query = "UpdateGallery";
                    var parameters = new DynamicParameters();
                    parameters.Add("@ProductId", productId);
                    parameters.Add("@GalleryId", galleryItem.GalleryId);
                    parameters.Add("@GalleryUrl", galleryItem.GalleryUrl);
                    parameters.Add("@IsMain", galleryItem.IsMain);
                    parameters.Add("@IsDeleted", galleryItem.IsDeleted);

                    await connection.ExecuteAsync(query, parameters, commandType: CommandType.StoredProcedure);
                }
            }
        }
       
        public async Task<Gallery> InsertGallery(GalleryDto galleryDto)
        {
            var query = "InsertGallery";
            var parameters = new DynamicParameters();
            parameters.Add("ProductId", galleryDto.ProductId, DbType.Int32);
            parameters.Add("Name", galleryDto.Name, DbType.String);
            parameters.Add("IsMain", galleryDto.IsMain, DbType.Boolean);

            using (var connection = _context.CreateConnection())
            {
                var result = await connection.QueryFirstOrDefaultAsync<Gallery>(query, parameters, commandType: CommandType.StoredProcedure);
                return result;
            }
        }
    }

}
