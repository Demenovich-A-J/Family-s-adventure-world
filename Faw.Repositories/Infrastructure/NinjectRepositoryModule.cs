using System.Configuration;
using Core.DataContext.Contracts;
using Faw.DataContext;
using Faw.Repositories.Contracts;
using Faw.Repositories.EntityFrameworkRepositories;
using Ninject;
using Ninject.Modules;

namespace Faw.Repositories.Infrastructure
{
    public class NinjectRepositoryModule : NinjectModule
    {
        private const string DefaultConnectionStringKey = "FamilyWorldDb";

        public override void Load()
        {
            var connectionString = ConfigurationManager.ConnectionStrings[DefaultConnectionStringKey].ConnectionString;

            Bind<IDataContextFactory>().To<FawDataContextFactory>()
                .InSingletonScope()
                .WithConstructorArgument("connectionString", connectionString);

            Bind<IDataContext>().ToMethod(context => Kernel.Get<IDataContextFactory>().CreateDataContext());

            Bind<IAccountRepository>().To<AccountRepository>();
            Bind<IClaimRepository>().To<ClaimRepository>();
            Bind<IFamilyRepository>().To<FamilyRepository>();
            Bind<IItemRepository>().To<ItemRepository>();
            Bind<IQuestRepository>().To<QuestRepository>();
            Bind<ISettingRepository>().To<SettingRepository>();
            Bind<IUserRepository>().To<UserRepository>();
            Bind<IUserTypeRepository>().To<UserTypeRepository>();
        }
    }
}