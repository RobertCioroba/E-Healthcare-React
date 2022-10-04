using AutoFixture;
using AutoFixture.Xunit2;
using E_Healthcare.Controllers;
using E_Healthcare.Data;
using E_Healthcare.Models;
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
    public class ProductsControllerTests
    {
        [Test, AutoData]
        public async Task GetAllMedicine_NoParameters_ListOfProducts()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var product = fixture.Build<Product>().Create();
            context.Products.Add(product);
            context.SaveChanges();

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.GetProducts();

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task SearchByUse_UseParameter_ProductsWithSpecifiedUse()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var product = fixture.Build<Product>().With(x => x.Uses,"durere").With(x => x.Name,"testName").Create();
            context.Products.Add(product);
            context.SaveChanges();

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.SearchByUse("dur");

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetProductById_ProductId_ProductObject()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var product = fixture.Build<Product>().With(x => x.ID, 5).With(x => x.Name, "testName").Create();
            context.Products.Add(product);
            context.SaveChanges();

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.GetProduct(5);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task PostProduct_NewMedicine_ReturnTheNewMedicineId()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Product>().With(x => x.ID, 5).Create();
            context.Products.Add(medicine);

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.PostProduct(medicine);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.ID, medicine.ID);
        }

        [Test, AutoData]
        public async Task DeleteProduct_IdOfProduct_RemoveTheSelectedProduct()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Product>().With(x => x.ID, 5).Create();
            context.Products.Add(medicine);
            context.SaveChanges();

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.DeleteProduct(5);

            //ASSERT
            response.Should().NotBeNull();
        }


        [Test, AutoData]
        public async Task GenerateReport_SettingsParameters_ReturnTheReportForSpecifiedPeriod()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Product>().Create();
            context.Products.Add(medicine);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            context.SaveChanges();

            var sut = new ProductsController(context);

            //ACT
            var response = await sut.GenerateReport(true,true,"yearly");

            //ASSERT
            response.Should().NotBeNull();
        }
    }
}
