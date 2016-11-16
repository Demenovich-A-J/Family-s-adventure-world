using System;

namespace Core.DataContext.Contracts
{
    public interface IDataContext : IQuerySource, IDisposable
    {
        IUnitOfWork CreateUnitOfWork();
    }
}
