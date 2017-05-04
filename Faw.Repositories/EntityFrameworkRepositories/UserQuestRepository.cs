using System;
using System.Data.Entity;
using System.Linq;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class UserQuestRepository : Repository<UserQuest>, IUserQuestRepository
    {
        public UserQuestRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public IQueryable<UserQuest> GetUserQuests(Guid userId)
        {
            return DbContext.UserQuests.Where(x => x.UserId == userId)
                .Include(x => x.Quest);
        }

        public UserQuest GetUserQuest(Guid userQuestId)
        {
            return DbContext.UserQuests.Include(x => x.Quest).FirstOrDefault(x => x.EntityId == userQuestId);
        }
    }
}