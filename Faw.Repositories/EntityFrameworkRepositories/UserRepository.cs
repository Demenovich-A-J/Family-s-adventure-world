using System;
using System.Data.Entity;
using System.Linq;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }

        public override User GetById(Guid entityId)
        {
            return
                DbContext.Users
                    .Include(x => x.Account)
                    .Include(x => x.Family)
                    .Include(x => x.UserType)
                    .FirstOrDefault(x => x.EntityId == entityId);
        }
    }
}