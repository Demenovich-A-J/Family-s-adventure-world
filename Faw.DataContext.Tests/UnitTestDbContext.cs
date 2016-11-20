using Core.DataContext.Contracts;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;

namespace Faw.DataContext.Tests
{
    [TestClass]
    public class UnitTestDbContext
    {
        private IKernel _kernel;

        [TestInitialize]
        public void TestInitialize()
        {
            _kernel = NinjectInitializer.InitntKernel();
        }

        [TestMethod]
        public void DataContext_NotNull()
        {
            var dataConstext = _kernel.Get<IDataContext>();

            Assert.IsNotNull(dataConstext);
        }
    }
}
