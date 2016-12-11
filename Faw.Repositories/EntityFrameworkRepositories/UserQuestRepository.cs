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
    }
}