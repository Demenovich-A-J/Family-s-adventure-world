using System;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;

namespace Faw.DataContext.Tests
{
    [TestClass]
    public class UnitTestRepositories
    {
        private IKernel _kernel;

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel = NinjectInitializer.InitntKernel();
        }

        [TestMethod]
        public void CreateAllRepositories_NotNull()
        {
            var settingRepo = _kernel.Get<ISettingRepository>();
            var accountRepo = _kernel.Get<IAccountRepository>();
            var claimRepo = _kernel.Get<IClaimRepository>();
            var familyRepo = _kernel.Get<IFamilyRepository>();
            var itemRepo = _kernel.Get<IItemRepository>();
            var questRepo = _kernel.Get<IQuestRepository>();
            var userRepo = _kernel.Get<IUserRepository>();
            var userTypeRepo = _kernel.Get<IUserTypeRepository>();

            Assert.IsNotNull(settingRepo);
            Assert.IsNotNull(accountRepo);
            Assert.IsNotNull(claimRepo);
            Assert.IsNotNull(familyRepo);
            Assert.IsNotNull(itemRepo);
            Assert.IsNotNull(questRepo);
            Assert.IsNotNull(userRepo);
            Assert.IsNotNull(userTypeRepo);
        }

        [TestMethod]
        public void InsertAndGetBackSetting_NotNull()
        {
            var settingRepo = _kernel.Get<ISettingRepository>();
            var dbconstextScopeFactory = _kernel.Get<IDbContextScopeFactory>();

            var settingId = new Guid("5A01F9B0-BC41-4D68-A4F6-897B20643A52");

            var setting = new Setting
            {
                EntityId = settingId,
                Name = "TEST_SETTING",
                Value = "TEST_VALUE"
            };

            Setting settingFromDb;

            using (var dbContextScope = dbconstextScopeFactory.Create())
            {
                settingRepo.Insert(setting);

                dbContextScope.SaveChanges();
            }

            using (var dbContextScope = dbconstextScopeFactory.CreateReadOnly())
            {
                settingFromDb = settingRepo.GetById(setting.EntityId);
            }

            using (var dbContextScope = dbconstextScopeFactory.Create())
            {
                settingRepo.Delete(settingId);

                dbContextScope.SaveChanges();
            }

            Assert.IsNotNull(settingFromDb);
            Assert.AreEqual(settingFromDb.EntityId, setting.EntityId);
        }
    }
}
