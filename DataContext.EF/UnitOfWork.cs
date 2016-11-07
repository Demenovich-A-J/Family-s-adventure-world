using System;
using System.Data.Entity;
using System.Linq;
using DataContext.Contracts;

namespace DataContext.EF
{
    public class UnitOfWork : IUnitOfWork
    {
        protected readonly DbContext DbContext;

        public UnitOfWork(DbContext dbContext)
        {
            DbContext = dbContext;
            
        }

        public virtual void Dispose()
        {
            DbContext.Dispose();
        }

        public void Track<T>(T entity) where T : class
        {
            var e = DbContext.Entry(entity);
            if (e.State == EntityState.Detached)
                e.State = EntityState.Unchanged;
        }

        public void Add<T>(T entity) where T : class
        {
            DbContext.Set<T>().Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            DbContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete<T>(T entity) where T : class
        {
            // we're not using the following
            // _dbContext.Set<T>().Remove(entity);
            // because it only works for attached entities (throws for detached)
            // the following will work both with attached and detached ones
            DbContext.Entry(entity).State = EntityState.Deleted;
        }

        public void Delete<T>(params object[] keyValues) where T : class
        {
            var e = DbContext.Set<T>().Find(keyValues);
            if (e != null)
                DbContext.Set<T>().Remove(e);
        }

        protected virtual void OnBeforeSaveChanges()
        {
        }

        public void SaveChanges()
        {
            OnBeforeSaveChanges();
            DbContext.SaveChanges();
        }

        public IDisposable NoChangeTrackingScope()
        {
            return new NoChangeTrackingScopeHelper(DbContext);
        }

        public IQueryable<T> Query<T>() where T : class
        {
            return DbContext.Set<T>();
        }

        #region helper classes

        internal sealed class NoChangeTrackingScopeHelper : IDisposable
        {
            private readonly DbContext _context;
            private readonly bool _wasTracking;

            public NoChangeTrackingScopeHelper(DbContext context)
            {
                _context = context;
                _wasTracking = context.Configuration.AutoDetectChangesEnabled;
                if (_wasTracking)
                    context.Configuration.AutoDetectChangesEnabled = false;
            }

            public void Dispose()
            {
                if (_wasTracking)
                {
                    _context.Configuration.AutoDetectChangesEnabled = true;
                    _context.ChangeTracker.DetectChanges();
                }
            }
        }

        #endregion

    }
}