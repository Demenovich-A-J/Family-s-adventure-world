using Faw.Services.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.DataManagement;
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