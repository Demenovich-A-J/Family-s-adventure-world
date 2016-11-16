using System;
using System.Linq;

namespace Core.DataContext.Contracts
{
    public interface IUnitOfWork : IDisposable
    {
        void Track<T>(T entity) where T : class;
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void Delete<T>(params object[] keyValues) where T : class;
        void SaveChanges();
        IDisposable NoChangeTrackingScope();
        IQueryable<T> Query<T>() where T : class;
    }
}
