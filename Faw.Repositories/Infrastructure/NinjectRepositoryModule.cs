using System.Configuration;
using Core.DataContext.Contracts;
using Faw.DataContext;
using Ninject;
using Ninject.Modules;

namespace Faw.Repositories.Infrastructure
{
    public class NinjectRepositoryModule : NinjectModule
    {
        private const string DefaultConnectionStringKey = "Entities";

        public override void Load()
        {
            var connectionString = ConfigurationManager.ConnectionStrings[DefaultConnectionStringKey].ConnectionString;

            Bind<IDataContextFactory>().To<FawDataContextFactory>()
                .InSingletonScope()
                .WithConstructorArgument("connectionString", connectionString);

            Bind<IDataContext>().ToMethod(context => Kernel.Get<IDataContextFactory>().CreateDataContext());
        }
    }
}