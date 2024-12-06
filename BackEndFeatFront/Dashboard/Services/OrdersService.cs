using Dashboard.DTOs;
using Dashboard.Models;
using Dashboard.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Services
{
    public class OrdersService : IOrdersService
    {
        private readonly IOrdersRepository _ordersRepository;

        public OrdersService(IOrdersRepository ordersRepository)
        {
            _ordersRepository = ordersRepository;
        }


        public async Task<PagedResult<OrderDto>> GetOrders(OrderQueryParameters queryParam)
        { return await _ordersRepository.GetOrders(queryParam); 
        }

        public async Task<OrderDetailsDto> GetOrderDetails(int orderId)
        { return await _ordersRepository.GetOrderDetails(orderId); }

        public async Task<bool> UpdateOrderStatus(int orderId, int statusId) 
        { return await _ordersRepository.UpdateOrderStatus(orderId, statusId);
        }

    }

}
