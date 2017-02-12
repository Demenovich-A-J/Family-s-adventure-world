﻿using System;
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
        public void TestRegisterUser_NotNull()
        {
            var userService = _kernel.Get<IUserService>();
            var userQueryService = _kernel.Get<IUserQueryService>();
            var serviceUser = new User
            {
                UserId = Guid.NewGuid(),
                FirstName = "FirstName",
                LastName = "LastName",
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

            var resultUser = userQueryService.GetUserById(serviceUser.UserId);

            Assert.IsNotNull(resultUser);
        }
    }
}
