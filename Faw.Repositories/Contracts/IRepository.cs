using System;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IRepository<T> where T : BaseEntity
    {
        void Insert(T item);
        void Update(T item);
        void Delete(T item);

        void Delete(Guid entityId);

        T GetById(Guid entityId);
    }
}