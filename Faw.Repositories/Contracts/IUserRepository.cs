using System.Collections.Generic;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IUserRepository : IRepository<User>
    {
        User Get(string emailOrLogin);
        IEnumerable<User> Find(string searchTerm);
    }
}