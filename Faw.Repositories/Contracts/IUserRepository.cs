using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IUserRepository : IRepository<User>
    {
        User Get(string emailOrLogin);
    }
}