using System;
using System.Linq;
using Faw.Models.Domain;
using Faw.Models.Domain.Enums;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class QuestRepository : Repository<Quest>, IQuestRepository
    {
        public QuestRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public QuestСomplexity GetQuestСomplexity(Guid questId)
        {
            return DbContext.Quests.First(x => x.EntityId == questId).QuestСomplexity;
        }
    }
}