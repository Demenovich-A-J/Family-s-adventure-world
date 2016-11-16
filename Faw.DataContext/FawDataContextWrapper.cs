using System.Data.Entity.Infrastructure;
using Core.DataContext.Contracts;
using Core.DataContext.EF;

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
