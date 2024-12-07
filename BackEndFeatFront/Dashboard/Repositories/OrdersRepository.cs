using Dapper;
using Dashboard.Data;
using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Services;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.Common;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Dashboard.Repositories
{
    public class OrdersRepository : IOrdersRepository
    {
        private readonly DapperContext _context;

        public OrdersRepository(DapperContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<OrderStatus>> GetOrderStatuses()
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "GetOrderStatuses";
                return await connection.QueryAsync<OrderStatus>(query, commandType: CommandType.StoredProcedure);
            }
            
        }


        public async Task<PagedResult<OrderDto>> GetOrders(OrderQueryParameters queryParam)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "GetOrders";
                var parameters = new DynamicParameters();
                parameters.Add("PageNumber", queryParam.PageNumber, DbType.Int32);
                parameters.Add("PageSize", queryParam.PageSize, DbType.Int32);
                parameters.Add("StartDate", queryParam.StartDate, DbType.DateTime2);
                parameters.Add("EndDate", queryParam.EndDate, DbType.DateTime2);
                parameters.Add("StatusName", queryParam.StatusName, DbType.String);
                parameters.Add("CustomerName", queryParam.CustomerName, DbType.String);

                using (var multi = await connection.QueryMultipleAsync(query, parameters, commandType: CommandType.StoredProcedure))
                {
                    var pagedResult = new PagedResult<OrderDto>
                    {
                        PageNumber = queryParam.PageNumber,
                        PageSize = queryParam.PageSize,
                        Total = multi.ReadSingle<int>(),
                        Items = multi.Read<OrderDto>().ToList(),

                    };

                    return pagedResult;
                }
            }
        }

        public async Task<OrderDetailsDto> GetOrderDetails(int orderId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "GetOrderDetails";
                var parameters = new DynamicParameters();
                parameters.Add("OrderId", orderId, DbType.Int32);

                var orderDictionary = new Dictionary<int, OrderDetailsDto>();

                var orders = await connection.QueryAsync<OrderDetailsDto, OrderDetailDto, OrderDetailsDto>(
                    query,
                    (order, orderDetail) =>
                    {
                        if (!orderDictionary.TryGetValue(order.OrderId, out var currentOrder))
                        {
                            currentOrder = order;
                            currentOrder.OrderDetails = new List<OrderDetailDto>();
                            orderDictionary.Add(currentOrder.OrderId, currentOrder);
                        }
                        currentOrder.OrderDetails.Add(orderDetail);
                        return currentOrder;
                    },
                    parameters,
                    commandType: CommandType.StoredProcedure,
                    splitOn: "ProductId"
                );

                return orderDictionary.Values.FirstOrDefault();
            }
        }



        public async Task<bool> UpdateOrderStatus(int orderId, int statusId)
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "UpdateOrderStatus";
                var parameters = new DynamicParameters();
                parameters.Add("OrderId", orderId, DbType.Int32);
                parameters.Add("StatusId", statusId, DbType.Int32);

                var affectedRows = await connection.ExecuteAsync(
                    query,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );

                return affectedRows > 0;
            }
        }




    }

}
