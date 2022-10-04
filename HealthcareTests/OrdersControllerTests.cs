using AutoFixture;
using AutoFixture.Xunit2;
using E_Healthcare.Controllers;
using E_Healthcare.Data;
using E_Healthcare.Models;
using E_Healthcare.Models.Enums;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HealthcareTests
{
    public class OrdersControllerTests
    {
        [Test, AutoData]
        public async Task GetOrders_NoParameter_ListOfOrders()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);
            context.SaveChanges();

            var sut = new OrdersController(context);

            //ACT
            var response = await sut.GetOrders();

            //ASSERT
            response.Should().NotBeNull();
        }


        [Test, AutoData]
        public async Task GetOrdersByUser_UserId_ListOfOrders()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().With(x => x.UserID, 5).With(x => x.TotalAmount, 90.00).Create();
            context.Orders.Add(order);
            context.SaveChanges();

            var sut = new OrdersController(context);

            //ACT
            var response = await sut.getOrdersByUser(5);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetOrderById_UserId_ReturnSelectedOrder()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().With(x => x.ID, 5).Create();
            context.Orders.Add(order);
            context.SaveChanges();

            var sut = new OrdersController(context);

            //ACT
            var response = await sut.GetOrder(5);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task ChangeOrderStatus_OrderIdAndNewStatus_ReturnTheUpdatedOrder()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().With(x => x.ID, 5).With(x => x.Status, OrderStatus.New).Create();
            context.Orders.Add(order);
            context.SaveChanges();

            var statusUpdated = fixture.Build<Order>().With(x => x.ID, 5).With(x => x.Status, OrderStatus.InProgress).Create();

            var sut = new OrdersController(context);

            //ACT
            var response = await sut.PutOrder(5,OrderStatus.InProgress);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Status, statusUpdated.Status);
        }
    }
}
