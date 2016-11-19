using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Core.DataContext.Contracts;
using Core.DataContext.EF;
using Faw.DataContext.EntityTypeConfigurations;

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

            builder.Configurations.Add(new AccountEntityConfiguration());
            builder.Configurations.Add(new ClaimEntityConfiguration());
            builder.Configurations.Add(new FamilyEntityConfiguration());
            builder.Configurations.Add(new ItemEntityConfiguration());
            builder.Configurations.Add(new QuestEntityConfiguration());
            builder.Configurations.Add(new SettingEntityConfiguration());
            builder.Configurations.Add(new UserEntityConfiguration());
            builder.Configurations.Add(new UserTypeEntityConfiguration());
        }

        public override IDataContext CreateDataContext()
        {
            return new FawDataContextWrapper(_connectionString, _compiledModel);
        }
    }
}