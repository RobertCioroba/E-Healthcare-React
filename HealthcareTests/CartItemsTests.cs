using AutoFixture;
using AutoFixture.Xunit2;
using E_Healthcare.Controllers;
using E_Healthcare.Data;
using E_Healthcare.Models;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace HealthcareTests
{
    public class CartItemsTests
    {
        [Test, AutoData]
        public async Task GetCartItems_GetAUserId_ReturnAllItemsForThatUser()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;

            var context = new DataContext(contextOptions);

            var user = fixture.Build<User>().With(x => x.ID, 5).Create();

            var cart = fixture.Build<Cart>().With(x => x.ID, 1).With(x => x.Owner, user).With(x => x.OwnerID, 5).Create();
            context.Carts.Add(cart);

            var item = fixture.Build<CartItem>().With(x => x.ID, 1).With(x => x.CartID, 5).Create();
            context.CartItems.Add(item);
            context.SaveChanges();

            var sut = new CartItemsController(context);

            //ACT
            var response = await sut.GetCartItems(5);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test,AutoData]
        public async Task GetCartItem_GetIdOfCartItem_ReturnCartItemObject()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;

            var context = new DataContext(contextOptions);

            var cartItem = fixture.Build<CartItem>().With(x => x.ID, 5).Create();
            context.CartItems.Add(cartItem);
            context.SaveChanges();

            var sut = new CartItemsController(context);

            //ACT
            var response = await sut.GetCartItem(5);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.ID,5);
        }

        [Test,AutoData]
        public async Task UpdateQuantity_GetCartItemIdAndNewQuantity_ReturnOkAfterlUpdate()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;

            var context = new DataContext(contextOptions);

            var cartItem = fixture.Build<CartItem>()
                .With(x => x.Quantity, 10)
                .With(x => x.ID, 5).Create();
            var product = fixture.Build<Product>().With(x => x.ID, 5).Create();
            
            context.Products.Add(product);
            context.CartItems.Add(cartItem);

            context.SaveChanges();

            var sut = new CartItemsController(context);

            //ACT
            var response = await sut.UpdateQuantity(5, 20);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Quantity, 20);
        }

/*        [Test, AutoData]
        public async Task DeleteCartItem_GetItemId_RemoveTheItemFromTheCart()
        {
            //ARRANGE
            var fixture = new Fixture();
            fixture.Behaviors.Remove(new ThrowingRecursionBehavior());
            fixture.Behaviors.Add(new OmitOnRecursionBehavior());
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var product = fixture.Build<Product>().With(x => x.ID, 10).With(x => x.Quantity, 80).Create();
            context.Products.Add(product);

            var cartItem = fixture.Build<CartItem>().With(x => x.ID, 5).With(x => x.Product, product).With(x => x.ProductID, 10).Create();
            context.CartItems.Add(cartItem);
            context.SaveChanges();

            var sut = new CartItemsController(context);

            //ACT
            var response = await sut.DeleteCartItem(5);

            //ASSERT
            var result = response.getStatusCode();
            Assert.AreEqual(200, response.Result.StatusCode);
        }*/
    }
}
