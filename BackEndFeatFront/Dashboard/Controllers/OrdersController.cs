using Dashboard.DTOs;
using Dashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersService _ordersService;

        public OrdersController(IOrdersService orderServuce)
        {
            _ordersService = orderServuce;
        }
        [HttpGet("GetOrders")]
        public async Task<IActionResult> GetOrdersWithDetails([FromQuery] OrderQueryParameters query)
        {
            var orders = await _ordersService.GetOrders(query);
            return Ok(orders);
        }

        [HttpGet("GetOrdersWithDetail")]
        public async Task<IActionResult> GetOrderDetails(int orderId)
        {
            var orderDetails = await _ordersService.GetOrderDetails(orderId);
            if (orderDetails == null)
            {
                return NotFound();
            }
            return Ok(orderDetails);
        }

        [HttpPut("GetOrdersWithDetail")]
        public async Task<IActionResult> UpdateOrderStatus([FromQuery] int orderId, [FromQuery] int statusId)
        {
            var result = await _ordersService.UpdateOrderStatus(orderId, statusId);
            if (!result)
            {
                return NotFound("سفارشی یافت نشد");
            }

            return Ok("وضعیت سفارش با موفقیت ویرایش شد");
        }

    }

}

