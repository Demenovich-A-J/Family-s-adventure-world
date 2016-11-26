using System;
using System.Collections.Generic;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IRepository<T> where T : BaseEntity
    {
        void Insert(T entity);
        void Update(T entity);
        void Delete(Guid entityId);

        T GetById(Guid entityId);

        IEnumerable<T> GetWhere(Func<T, bool> predicate);
    }
}