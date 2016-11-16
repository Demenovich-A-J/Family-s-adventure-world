using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using Core.DataContext.Contracts;

namespace Core.DataContext.EF
{
    public abstract class DataContextWrapper : IDataContext
    {
        private readonly DbContext _dbContext;
        private readonly string _connectionString;
        private readonly DbCompiledModel _compiledModel;

        protected DataContextWrapper(string connectionString, DbCompiledModel compiledModel)
        {
            _connectionString = connectionString;
            _compiledModel = compiledModel;
            _dbContext = CreateDbContext();
        }

        protected DbContext CreateDbContext()
        {
            var dc = new DbContext(_connectionString, _compiledModel);
            dc.Configuration.ProxyCreationEnabled = false;
            dc.Configuration.LazyLoadingEnabled = false;
            return dc;
        }

        public IQueryable<T> Query<T>() where T : class
        {
            return _dbContext.Set<T>().AsNoTracking();
        }

        public int ExecuteSql(System.Data.IsolationLevel isolationLevel, string sql, params object[] parameters)
        {
            using (var transaction = _dbContext.Database.BeginTransaction(isolationLevel))
            {
                var returnValue = _dbContext.Database.ExecuteSqlCommand(sql, parameters);
                transaction.Commit();
                return returnValue;
            }
        }

        public abstract IUnitOfWork CreateUnitOfWork();

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
