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
    public class AccountsControllerTests
    {
        [Test, AutoData]
        public async Task GetAllAcounts_NoParameters_ListOfAllRegisteredAccounts()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>().Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountsController(context);

            //ACT
            var result = await sut.Get();

            //ASSERT
            result.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetAccountById_IdOfAccount_AccountModel()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>().With(x => x.ID, 5).With(x => x.AccNumber, 50).Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountsController(context);

            //ACT
            var response = await sut.Get(50);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.ID, 5);
        }

        [Test, AutoData]
        public async Task AddFunds_UserParameters_AccountWithAmountUpdated()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>().With(x => x.AccNumber, 5).With(x => x.Amount, 10).Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountsController(context);

            //ACT
            var response = await sut.AddFunds(5, 5, 10);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Amount, 20);
        }

        [Test, AutoData]
        public async Task UpdateAccount_OldAccount_EditedAccount()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), x => x.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>().With(x => x.ID, 10).With(x => x.AccNumber, 50).Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var editedAccount = fixture.Build<Account>().With(x => x.ID, 10).With(x => x.AccNumber, 60).Create();

            var sut = new AccountsController(context);

            //ACT
            var response = await sut.UpdateAccount(editedAccount);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.AccNumber, 60);
        }
    }
}
