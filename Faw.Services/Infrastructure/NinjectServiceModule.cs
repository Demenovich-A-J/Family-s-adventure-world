using Faw.Services.Contracts;
using Faw.Services.Contracts.DataAccess;
using Faw.Services.DataAccess;
using Ninject.Modules;

namespace Faw.Services.Infrastructure
{
    public class NinjectServiceModule : NinjectModule
    {
        public override void Load()
        {
            Bind<IUserService>().To<UserService>();
            Bind<IUserTypeService>().To<UserTypeService>();
        }
    }
}