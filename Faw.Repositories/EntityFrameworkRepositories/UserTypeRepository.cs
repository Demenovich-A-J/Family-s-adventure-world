using System.Linq;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class UserTypeRepository : Repository<UserType>, IUserTypeRepository
    {
        public UserTypeRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public UserType GetByName(string name)
        {
            return DbContext.UserTypes.FirstOrDefault(x => x.Name == name);
        }
    }
}