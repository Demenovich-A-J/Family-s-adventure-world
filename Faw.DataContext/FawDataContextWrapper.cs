using System;
using System.Data.Entity.Infrastructure;
using DataContext.Contracts;
using DataContext.EF;

namespace Faw.DataContext
{
    public class FawDataContextWrapper : DataContextWrapper
    {
        public FawDataContextWrapper(string connectionString, DbCompiledModel compiledModel) : base(connectionString, compiledModel)
        {
        }

        public override IUnitOfWork CreateUnitOfWork()
        {
            return new FawUnitOfWork(CreateDbContext());
        }
    }
}
