using Faw.Repositories.Infrastructure;
using Ninject;

namespace Faw.DataContext.Tests
{
    public static class NinjectInitializer
    {
        public static IKernel InitntKernel()
        {
            var kernel = new StandardKernel();

            kernel.Load(typeof(NinjectRepositoryModule).Assembly);

            return kernel;
        }
    }
}