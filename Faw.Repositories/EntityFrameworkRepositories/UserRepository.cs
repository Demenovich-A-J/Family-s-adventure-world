using System;
using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(IDataContext dataContext) : base(dataContext)
        {
        }


        public override void Update(User entityToUpdate)
        {
            if (entityToUpdate == null)
                throw new ArgumentNullException(nameof(entityToUpdate));

            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Update(entityToUpdate);
                uow.Update(entityToUpdate.Account);

                uow.SaveChanges();
            }
        }
    }
}