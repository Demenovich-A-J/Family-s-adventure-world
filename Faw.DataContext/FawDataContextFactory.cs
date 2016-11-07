using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using DataContext.Contracts;
using DataContext.EF;

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

            throw new System.NotImplementedException();
        }

        public override IDataContext CreateDataContext()
        {
            return new FawDataContextWrapper(_connectionString, _compiledModel);
        }
    }
}