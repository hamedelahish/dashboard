using Dashboard.DTOs;
using Dashboard.Models;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
    public interface IOrdersService
    {
        Task<IEnumerable<OrderDto>> GetOrders(OrderQueryParameters query);
        Task<OrderDetailsDto> GetOrderDetails(int orderId);

        Task<bool> UpdateOrderStatus(int orderId, int statusId);
    }

}
