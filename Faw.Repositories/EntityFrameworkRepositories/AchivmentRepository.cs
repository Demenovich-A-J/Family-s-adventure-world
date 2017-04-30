using System;
using System.Data.Entity;
using System.Linq;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class AchivmentRepository : Repository<Achivment>, IAchivmentRepository
    {
        public AchivmentRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }


        public IQueryable<UserAchivment> GetUserAchivment(Guid userId)
        {
            return DbContext.UserAchivments
                .Include(x => x.User)
                .Include(x => x.Achivment)
                .Where(x => x.UserId == userId);
        }
    }
}