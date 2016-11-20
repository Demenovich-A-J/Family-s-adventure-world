using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class FamilyRepository : Repository<Family>, IFamilyRepository
    {
        public FamilyRepository(IDataContext dataContext) : base(dataContext)
        {
        }
    }
}