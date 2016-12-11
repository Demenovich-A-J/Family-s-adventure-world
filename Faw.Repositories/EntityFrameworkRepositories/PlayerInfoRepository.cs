using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class PlayerInfoRepository : Repository<PlayerInfo>, IPlayerInfoRepository
    {
        public PlayerInfoRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}