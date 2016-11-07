using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration;
using System.Data.Entity.SqlServer;
using System.Data.SqlClient;
using System.Linq.Expressions;
using DataContext.Contracts;

namespace DataContext.EF
{
    public abstract class DataContextFactory : IDataContextFactory
    {
        #region custom DbConfiguration

        private class CustomConfiguration : DbConfiguration
        {
            public CustomConfiguration()
            {
                SetProviderServices("System.Data.SqlClient", SqlProviderServices.Instance);
                SetDatabaseInitializer<DbContext>(null); // don't try to create db from code first
            }
        }

        #endregion

        protected DbCompiledModel _compiledModel;
        protected readonly string _connectionString;

        static DataContextFactory()
        {
            DbConfiguration.SetConfiguration(new CustomConfiguration());
        }

        protected DataContextFactory(string connectionString)
        {
            _connectionString = connectionString;
            CreateModel();
        }

        private void CreateModel()
        {
            var connection = new SqlConnection { ConnectionString = _connectionString };
            var builder = new DbModelBuilder();
            BuildModel(builder);

            var model = builder.Build(connection);
            _compiledModel = model.Compile();
        }

        protected abstract void BuildModel(DbModelBuilder builder);

        protected static EntityTypeConfiguration<TEntity> Map<TEntity>(DbModelBuilder modelBuilder) where TEntity : class
        {
            return modelBuilder.Entity<TEntity>().ToTable(typeof(TEntity).Name);
        }

        protected static void Map<TEntity>(DbModelBuilder modelBuilder, Expression<Func<TEntity, Guid>> pkFunc, string pkName = null) where TEntity : class
        {
            var expr = modelBuilder.Entity<TEntity>().ToTable(typeof(TEntity).Name);
            if (!string.IsNullOrEmpty(pkName))
                expr.Property(pkFunc).HasColumnName(pkName);
        }

        public abstract IDataContext CreateDataContext();


    }
}