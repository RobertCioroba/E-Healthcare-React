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
    public class UsersControllerTests
    {
        [Test, AutoData]
        public async Task GetUsers_NoParameters_ReturnTrueIfWeHaveUsersInDatabase()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var user = fixture.Build<User>().Create();
            context.Users.Add(user);

            var sut = new UsersController(context);

            //ACT
            var response = await sut.GetUsers();

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetUserById_EnterIdOfTheUser_ReturnTrueIfWeGetTheUserData()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var user = fixture.Build<User>().With(x => x.ID, 5).With(x => x.FirstName,"TestName").Create();
            context.Users.Add(user);
            context.SaveChanges();

            var sut = new UsersController(context);

            //ACT
            var response = await sut.GetUser(5);

            //ASSERT
            response.Should().NotBeNull();
        }
    }
}
