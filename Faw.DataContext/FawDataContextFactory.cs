using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Core.DataContext.Contracts;
using Core.DataContext.EF;

namespace Faw.DataContext
{
    public class FawDataContextFactory : DataContextFactory
    {
        public FawDataContextFactory(string connectionString) : base(connectionString)
        {
        }

        protected override void BuildModel(DbModelBuilder builder)
        {
            builder.Conventions.Remove<PluralizingTableNameConvention>();
        }

        public override IDataContext CreateDataContext()
        {
            return new FawDataContextWrapper(_connectionString, _compiledModel);
        }
    }
}