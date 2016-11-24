using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class QuestRepository : Repository<Quest>, IQuestRepository
    {
        public QuestRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}