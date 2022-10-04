using AutoFixture;
using AutoFixture.Xunit2;
using E_Healthcare.Controllers;
using E_Healthcare.Data;
using E_Healthcare.Models;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentAssertions;


namespace HealthcareTests
{
    public class CartsControllerTests
    {
        [Test, AutoData]
        public async Task GetCarts_NoParameters_ListOfAllCarts()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var cart = fixture.Build<Cart>().Create();
            context.Carts.Add(cart);
            context.SaveChanges();
            var sut = new CartsController(context);

            //ACT
            var response = await sut.GetCarts();

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetCartById_CartId_CartObject()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var cart = fixture.Build<Cart>().With(x => x.ID, 5).Create();
            context.Carts.Add(cart);
            context.SaveChanges();

            var sut = new CartsController(context);

            //ACT
            var response = await sut.GetCart(5);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task Checkout_UserId_PlaceANewOrder()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);
            var user = fixture.Build<User>().With(x => x.ID, 10).With(x => x.Email, "test@t.t").Create();
            context.Users.Add(user);

            var cart = fixture.Build<Cart>().With(x => x.OwnerID, 10).With(x => x.ID, 1).Create();
            context.Carts.Add(cart);

            var product = fixture.Build<Product>().With(x => x.ID, 1).With(x => x.Price, 10).Create();
            context.Products.Add(product);

            var cartItem = fixture.Build<CartItem>().With(x => x.CartID, 1).With(x => x.Quantity, 2).With(x => x.Product, product).With(x => x.ProductID, 1).Create();
            context.CartItems.Add(cartItem);

            var account = fixture.Build<Account>().With(x => x.Email, "test@t.t").With(x => x.Amount, 200).Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var order = fixture.Build<Order>().With(x => x.UserID, 10).With(x => x.TotalAmount, 20).Create();
            context.Orders.Add(order);


            var sut = new CartsController(context);

            //ACT
            var response = await sut.Checkout(10);

            //ASSERT
            response.Should().NotBeNull();
        }
    }
}
