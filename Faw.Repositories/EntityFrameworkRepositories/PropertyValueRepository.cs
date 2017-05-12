using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class PropertyValueRepository : Repository<PropertyValue>, IPropertyValueRepository
    {
        public PropertyValueRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}