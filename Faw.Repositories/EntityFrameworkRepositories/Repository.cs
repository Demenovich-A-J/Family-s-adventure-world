using System;
using System.Linq;
using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
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
                uow.SaveChanges();
            }
        }

        public virtual void Delete(TEntity item)
        {
            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Delete(item);
                uow.SaveChanges();
            }
        }

        public virtual void Delete(Guid entityId)
        {
            var item = GetById(entityId);

            if(item == null)
                throw new ArgumentNullException("entityId", "Item with such entityId can not be found.");

            Delete(item);
        }

        public virtual TEntity GetById(Guid entityId)
        {
            return DataContext.Query<TEntity>().FirstOrDefault(x => x.EntityId == entityId);
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            using (var uow = DataContext.CreateUnitOfWork())
            {
                uow.Update(entityToUpdate);
                uow.SaveChanges();
            }
        }
    }
}
