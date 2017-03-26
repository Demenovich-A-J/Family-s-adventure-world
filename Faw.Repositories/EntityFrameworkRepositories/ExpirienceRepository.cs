using System.Linq;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ExpirienceRepository : Repository<Expirience>, IExpirienceRepository
    {
        public ExpirienceRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public Expirience Get(int level)
        {
            return DbContext.Expiriences.FirstOrDefault(x => x.Level == level);
        }
    }
}