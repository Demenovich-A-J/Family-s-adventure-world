using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using Faw.DataContext;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Faw.Repositories.Extensions;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public abstract class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity, new()
    {
        private readonly IAmbientDbContextLocator _ambientDbContextLocator;

        protected FawDataContext DbContext
        {
            get
            {
                var dbContext = _ambientDbContextLocator.Get<FawDataContext>();

                if (dbContext == null)
                    throw new InvalidOperationException(
                        "No ambient DbContext of type FawDataContext found. " +
                        "This means that this repository method has been called outside of the scope of a DbContextScope. " +
                        "A repository must only be accessed within the scope of a DbContextScope, which takes care of creating the DbContext instances that the repositories need and making them available as ambient contexts. " +
                        "This is what ensures that, for any given DbContext-derived type, the same instance is used throughout the duration of a business transaction. " +
                        "To fix this issue, use IDbContextScopeFactory in your top-level business logic service method to create a DbContextScope that wraps the entire business transaction that your service method implements. " +
                        "Then access this repository within that scope. Refer to the comments in the IDbContextScope.cs file for more details.");

                return dbContext;
            }
        }
        protected Repository(IAmbientDbContextLocator dataContext)
        {
            _ambientDbContextLocator = dataContext;
        }

        public virtual void Insert(TEntity entity)
        {
            DbContext.Set<TEntity>().Add(entity);
        }

        public virtual void Delete(Guid entityId)
        {
            var entityToDelete = GetById(entityId);

            if (entityToDelete == null)
                throw new ObjectNotFoundException();

            Delete(entityToDelete);
        }

        public virtual TEntity GetById(Guid entityId)
        {
            return DbContext.Set<TEntity>().FirstOrDefault(x => x.EntityId == entityId);
        }

        public virtual IQueryable<TEntity> GetWhere(Func<TEntity, bool> predicate)
        {
            return DbContext.Set<TEntity>().Where(predicate).AsQueryable();
        }

        public IQueryable<TEntity> Get()
        {
            return DbContext.Set<TEntity>();
        }

        public virtual void Update(TEntity entityToUpdate)
        {
            DbContext.Entry(entityToUpdate).State = EntityState.Modified;
        }

        private void Delete(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Deleted;
        }

        public virtual TEntity Save(TEntity entity)
        {
            return DbContext.InsertOrUpdate(entity, entity.EntityId);
        }

        public virtual void DeleteRange(IEnumerable<Guid> guids)
        {
            DbContext.Set<TEntity>().RemoveRange(guids);
        }
    }
}
