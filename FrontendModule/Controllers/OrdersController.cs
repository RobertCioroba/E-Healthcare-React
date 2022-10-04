using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using E_Healthcare.Data;
using E_Healthcare.Models;
using Microsoft.AspNetCore.Authorization;
using E_Healthcare.Models.Enums;

namespace E_Healthcare.Controllers
{
    [Route("api/order")]
    [ApiController]
    //[Authorize(Roles = "Admin,User")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("getAllOrders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }
            return await _context.Orders.ToListAsync();
        }

        [HttpGet("getOrderById/{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("getOrdersByUser/{id}")]
        public async Task<ActionResult<IEnumerable<Order>>> getOrdersByUser(int id)
        {
            List<Order> orders = await _context.Orders.Where(x => x.UserID == id).ToListAsync();

            if (orders.Count() == 0)
                return NotFound();

            return Ok(orders);
        }

        [HttpPut("changeOrderStatus/{orderId}/{status}")]
        public async Task<ActionResult<Order>> PutOrder(int orderId, OrderStatus status)
        {
            Order order = await _context.Orders.FirstOrDefaultAsync(x => x.ID == orderId);

            if (order == null)
                return NotFound("Order not found.");

            order.Status = status;
            await _context.SaveChangesAsync();

            return Ok(order);
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.ID == id)).GetValueOrDefault();
        }
    }
}
