using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class QuestRepository : Repository<Quest>, IQuestRepository
    {
        public QuestRepository(IDataContext dataContext) : base(dataContext)
        {
        }
    }
}