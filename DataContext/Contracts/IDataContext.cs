using System;

namespace DataContext.Contracts
{
    public interface IDataContext : IQuerySource, IDisposable
    {
        IUnitOfWork CreateUnitOfWork();
    }
}
