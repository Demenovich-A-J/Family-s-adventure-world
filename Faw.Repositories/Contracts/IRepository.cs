using System;

namespace Faw.Repositories.Contracts
{
    public interface IRepository<in T>
    {
        void Insert(T item);
        void Update(T item);
        void Delete(T id);
    }
}