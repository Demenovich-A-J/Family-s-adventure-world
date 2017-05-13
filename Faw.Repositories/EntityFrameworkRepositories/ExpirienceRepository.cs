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

        public Expirience GetByExpirience(decimal expirience)
        {
            return
                DbContext.Expiriences
                    .Where(x => x.ExpirienceAmount <= expirience)
                    .OrderByDescending(x => x.Level)
                    .FirstOrDefault();
        }
    }
}