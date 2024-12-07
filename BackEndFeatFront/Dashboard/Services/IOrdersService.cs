using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
    public interface IOrdersService
    {
        Task<PagedResult<OrderDto>> GetOrders(OrderQueryParameters queryParam);
        Task<OrderDetailsDto> GetOrderDetails(int orderId);

        Task<bool> UpdateOrderStatus(int orderId, int statusId);

        Task<IEnumerable<OrderStatus>> GetOrderStatuses();
     }

}
