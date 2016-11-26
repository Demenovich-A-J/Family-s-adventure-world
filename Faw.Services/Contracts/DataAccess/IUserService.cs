using Faw.Services.Models;

namespace Faw.Services.Contracts.DataAccess
{
    public interface IUserService
    {
        void Register(User user);
    }
}