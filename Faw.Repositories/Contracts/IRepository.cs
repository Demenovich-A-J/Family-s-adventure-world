using System;
using System.Collections.Generic;
using System.Linq;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IRepository<T> where T : BaseEntity, new()
    {
        void Insert(T entity);
        void Update(T entity);
        void Delete(Guid entityId);

        T GetById(Guid entityId);

        IQueryable<T> GetWhere(Func<T, bool> predicate);

        IQueryable<T> Get();

        T Save(T entity);

        void DeleteRange(IEnumerable<Guid> guids);
    }
}