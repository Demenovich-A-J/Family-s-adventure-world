using System;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;
using System.Data.Entity;
using System.Linq;
using Faw.Repositories.Extensions;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class ExpressionPropertyRepository : Repository<ExpressionProperty>, IExpressionPropertyRepository
    {
        public ExpressionPropertyRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public ExpressionProperty Get(Guid id)
        {
            return DbContext.ExpressionProperties
                .Include(x => x.LeftPropertyValue)
                .Include(x => x.RightPropertyValue)
                .FirstOrDefault(x => x.EntityId == id);
        }
    }
}