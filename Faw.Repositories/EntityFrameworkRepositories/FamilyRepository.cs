using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class FamilyRepository : Repository<Family>, IFamilyRepository
    {
        public FamilyRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}