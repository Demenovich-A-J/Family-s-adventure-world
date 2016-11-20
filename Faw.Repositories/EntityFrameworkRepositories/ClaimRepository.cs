using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ClaimRepository : Repository<Claim>, IClaimRepository
    {
        public ClaimRepository(IDataContext dataContext) : base(dataContext)
        {
        }
    }
}