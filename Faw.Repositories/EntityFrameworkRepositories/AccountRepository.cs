using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class AccountRepository : Repository<Account>, IAccountRepository
    {
        public AccountRepository(IDataContext dataContext) : base(dataContext)
        {
        }
    }
}