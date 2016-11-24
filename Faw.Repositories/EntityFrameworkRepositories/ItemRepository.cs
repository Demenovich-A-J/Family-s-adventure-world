using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}