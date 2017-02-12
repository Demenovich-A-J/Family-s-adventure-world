using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IUserTypeRepository : IRepository<UserType>
    {
        UserType Get(string name);
    }
}