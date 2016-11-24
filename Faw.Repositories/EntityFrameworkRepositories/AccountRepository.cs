using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}