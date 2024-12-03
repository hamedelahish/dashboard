using Dashboard.DTOs;
using Dashboard.Models;

namespace Dashboard.Repositories
{
    public interface IOrdersRepository
    {
        Task<IEnumerable<OrderDto>> GetOrders(OrderQueryParameters query);
        Task<OrderDetailsDto> GetOrderDetails(int orderId);
        Task<bool> UpdateOrderStatus(int orderId, int statusId);
    }

}
