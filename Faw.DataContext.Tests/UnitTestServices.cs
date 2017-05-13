using System;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Services.Models.Enums;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;

namespace Faw.DataContext.Tests
{
    /// <summary>
    /// Summary description for UnitTestServices
    /// </summary>
    [TestClass]
    public class UnitTestServices
    {
        private IKernel _kernel;

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel = NinjectInitializer.InitntKernel();

            Mapper.Initialize(cfg => cfg.AddProfiles(AppDomain.CurrentDomain.GetAssemblies()));

            _kernel.Bind<IMapper>().ToMethod(x => Mapper.Configuration.CreateMapper()).InSingletonScope();
        }

        [TestMethod]
        public void TestRegisterDadUser_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();

            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "Homer",
                LastName = "Simpson",
                BirthDate = DateTime.Today,
                Gender = Gender.Male,
                Account = new Account
                {
                    UserType = "Dad",
                    Email = "HomerSimpson@email.com",
                    Password = "123456",
                    Login = "Homer Dad",
                },
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta sed lacus nec egestas. Donec ac tristique massa. Nullam congue sagittis libero, varius eleifend ex tempus id. Donec sodales at odio sit amet suscipit. Quisque interdum dui non urna feugiat commodo. Vestibulum non dapibus augue. Duis quis elit quis felis dapibus varius. Maecenas odio risus, mollis et justo at, imperdiet molestie velit.",
                City = "Springfield",
                Country = "USA"
            };

            userService.Register(serviceUser);

            var resultUser = userQueryService.Get(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }

        [TestMethod]
        public void TestRegisterMomUser_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();
            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "Marge",
                LastName = "Simpson",
                BirthDate = DateTime.Today,
                Gender = Gender.Female,
                Account = new Account
                {
                    UserType = "Mom",
                    Email = "MargeSimpson@email.com",
                    Password = "123456",
                    Login = "Marge Mom"
                },
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta sed lacus nec egestas. Donec ac tristique massa. Nullam congue sagittis libero, varius eleifend ex tempus id. Donec sodales at odio sit amet suscipit. Quisque interdum dui non urna feugiat commodo. Vestibulum non dapibus augue. Duis quis elit quis felis dapibus varius. Maecenas odio risus, mollis et justo at, imperdiet molestie velit.",
                City = "Springfield",
                Country = "USA"

            };

            userService.Register(serviceUser);

            var resultUser = userQueryService.Get(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }

        [TestMethod]
        public void TestRegisterSonUser_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();
            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "Bart",
                LastName = "Simpson",
                BirthDate = DateTime.Today,
                Gender = Gender.Male,
                Account = new Account
                {
                    UserType = "Son",
                    Email = "BartSimpson@email.com",
                    Password = "123456",
                    Login = "Bart Son"
                },
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta sed lacus nec egestas. Donec ac tristique massa. Nullam congue sagittis libero, varius eleifend ex tempus id. Donec sodales at odio sit amet suscipit. Quisque interdum dui non urna feugiat commodo. Vestibulum non dapibus augue. Duis quis elit quis felis dapibus varius. Maecenas odio risus, mollis et justo at, imperdiet molestie velit.",
                City = "Springfield",
                Country = "USA"
            };

            userService.Register(serviceUser);

            var resultUser = userQueryService.Get(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }

        [TestMethod]
        public void TestRegisterDaughterUser_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();
            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "Lisa",
                LastName = "Simpson",
                BirthDate = DateTime.Today,
                Gender = Gender.Female,
                Account = new Account
                {
                    UserType = "Daughter",
                    Email = "LisaSimpson@email.com",
                    Password = "123456",
                    Login = "Lisa Daughter"
                },
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porta sed lacus nec egestas. Donec ac tristique massa. Nullam congue sagittis libero, varius eleifend ex tempus id. Donec sodales at odio sit amet suscipit. Quisque interdum dui non urna feugiat commodo. Vestibulum non dapibus augue. Duis quis elit quis felis dapibus varius. Maecenas odio risus, mollis et justo at, imperdiet molestie velit.",
                City = "Springfield",
                Country = "USA"
            };

            userService.Register(serviceUser);

            var resultUser = userQueryService.Get(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }

        [TestMethod]
        public void TestRegisterAdmin_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();
            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "Artur",
                LastName = "Dem",
                BirthDate = DateTime.Today,
                Gender = Gender.Male,
                Account = new Account
                {
                    UserType = "Admin",
                    Email = "email@email.com",
                    Password = "123456",
                    Login = "Admin"
                }
            };

            userService.Register(serviceUser);

            var resultUser = userQueryService.Get(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }
    }
}
