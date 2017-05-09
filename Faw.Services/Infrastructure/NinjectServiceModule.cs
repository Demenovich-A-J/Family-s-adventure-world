using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Logic;
using Faw.Services.Contracts.Query;
using Faw.Services.DataManagement;
using Faw.Services.Logic;
using Faw.Services.Query;
using Ninject.Modules;

namespace Faw.Services.Infrastructure
{
    public class NinjectServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IUserService>().To<UserService>();
            Bind<IUserTypeService>().To<UserTypeService>();
            Bind<IFamilyService>().To<FamilyService>();
            Bind<IPlayerInfoService>().To<PlayerInfoService>();
            Bind<IQuestService>().To<QuestService>();
            Bind<IAchivmentsService>().To<AchivmentsService>();

            Bind<IUserTypeQueryService>().To<UserTypeQueryService>();
            Bind<IUserQueryService>().To<UserQueryService>();
            Bind<IAccountQueryService>().To<AccountQueryService>();
            Bind<IFamilyQueryService>().To<FamilyQueryService>();
            Bind<IQuestQueryService>().To<QuestQueryService>();
            Bind<IExpirienceQueryService>().To<ExpirienceQueryService>();
            Bind<IAchivmentsQueryService>().To<AchivmentsQueryService>();

            Bind<IConditionExpressionBuilder>().To<ConditionExpressionBuilder>();
        }
    }
}