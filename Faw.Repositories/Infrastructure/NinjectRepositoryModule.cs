using System.Configuration;
using Faw.DataContext;
using Faw.Repositories.Contracts;
using Faw.Repositories.EntityFrameworkRepositories;
using Mehdime.Entity;
using Ninject.Modules;

namespace Faw.Repositories.Infrastructure
{
    public class NinjectRepositoryModule : NinjectModule
    {
        private const string DefaultConnectionStringKey = "FamilyWorldDb";

        public override void Load()
        {
            var connectionString = ConfigurationManager.ConnectionStrings[DefaultConnectionStringKey].ConnectionString;

            EfDbContextFactory.ConnectionStrings[typeof(FawDataContext)] = connectionString;
            Bind<IDbContextFactory>().To<EfDbContextFactory>().InSingletonScope();
            Bind<IDbContextScopeFactory>().To<DbContextScopeFactory>().InSingletonScope();
            Bind<IAmbientDbContextLocator>().To<AmbientDbContextLocator>().InSingletonScope();

            Bind<IAccountRepository>().To<AccountRepository>();
            Bind<IClaimRepository>().To<ClaimRepository>();
            Bind<IFamilyRepository>().To<FamilyRepository>();
            Bind<IItemRepository>().To<ItemRepository>();
            Bind<IQuestRepository>().To<QuestRepository>();
            Bind<ISettingRepository>().To<SettingRepository>();
            Bind<IUserRepository>().To<UserRepository>();
            Bind<IUserTypeRepository>().To<UserTypeRepository>();
            Bind<IUserQuestRepository>().To<UserQuestRepository>();
            Bind<IPlayerInfoRepository>().To<PlayerInfoRepository>();
        }
    }
}