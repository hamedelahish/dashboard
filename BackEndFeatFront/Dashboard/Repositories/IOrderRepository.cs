using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
    public interface IOrdersRepository
    {
        Task<PagedResult<OrderDto>> GetOrders(OrderQueryParameters queryParam);
        Task<OrderDetailsDto> GetOrderDetails(int orderId);
        Task<bool> UpdateOrderStatus(int orderId, int statusId);
        Task<IEnumerable<OrderStatus>> GetOrderStatuses();
    }

}
