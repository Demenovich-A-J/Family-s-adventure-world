using System.Linq;
using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class UserTypeRepository : Repository<UserType>, IUserTypeRepository
    {
        public UserTypeRepository(IDataContext dataContext) : base(dataContext)
        {
        }

        public UserType GetByName(string name)
        {
            return DataContext.Query<UserType>().FirstOrDefault(x => x.Name == name);
        }
    }
}