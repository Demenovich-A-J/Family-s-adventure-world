using System;
using System.Collections.Generic;
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
                    .Include(x => x.UserType.Claims)
                    .FirstOrDefault(x => x.EntityId == entityId);
        }

        public User Get(string emailOrLogin)
        {
            return DbContext.Users
                .Include(x => x.Account)
                .Include(x => x.Family)
                .Include(x => x.PlayerInfo)
                .Include(x => x.UserType)
                .Include(x => x.UserType.Claims)
                .FirstOrDefault(
                    x =>
                        x.Account.Login.Equals(emailOrLogin, StringComparison.OrdinalIgnoreCase) ||
                        x.Account.Email.Equals(emailOrLogin, StringComparison.OrdinalIgnoreCase));

        }

        public IEnumerable<User> Find(string searchTerm)
        {
            var splited = searchTerm.Split(' ');

            return DbContext.Users
                .Include(x => x.Account)
                .Where(
                    x =>
                        splited.Any(
                            s =>
                                x.FirstName.Contains(s) || x.LastName.Contains(s) || x.Account.Email.Contains(s)));
        }
    }
}