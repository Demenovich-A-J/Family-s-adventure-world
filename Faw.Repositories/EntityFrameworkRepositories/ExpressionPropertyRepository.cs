using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ExpressionPropertyRepository : Repository<ExpressionProperty>, IExpressionPropertyRepository
    {
        public ExpressionPropertyRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}