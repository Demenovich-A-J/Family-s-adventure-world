using Mehdime.Entity;
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
    }
}
