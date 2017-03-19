using System;
using System.Data.Entity;
using System.Linq;
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

        public override Family GetById(Guid entityId)
        {
            return
                DbContext.Families
                    .Include(x => x.CreatedBy)
                    .Include(x => x.FamilyMemebers)
                    .FirstOrDefault(x => x.EntityId == entityId);
        }

        public Family GetUserFamily(Guid userId)
        {
            return
                DbContext.Families
                    .Include(x => x.CreatedBy)
                    .Include(x => x.FamilyMemebers)
                    .FirstOrDefault(x => x.CreatedById == userId || x.FamilyMemebers.Any(fm => fm.EntityId == userId));
        }
    }
}