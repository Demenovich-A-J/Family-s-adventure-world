using Core.DataContext.Contracts;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly IDataContext DataContext;

        protected Repository(IDataContext dataContext)
        {
            DataContext = dataContext;
        }

        public virtual void Insert(TEntity entity)
        {
            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Add(entity);
            }
        }

        public virtual void Delete(TEntity entityToDelete)
        {
            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Delete(entityToDelete);
            }
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Update(entityToUpdate);
            }
        }
    }
}
