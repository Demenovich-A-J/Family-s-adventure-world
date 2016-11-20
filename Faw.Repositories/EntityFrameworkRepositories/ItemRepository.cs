using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(IDataContext dataContext) : base(dataContext)
        {
        }
    }
}