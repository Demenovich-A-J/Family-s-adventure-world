using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ExpressionPropertyEntityConfiguration : BaseEntityTypeConfiguration<ExpressionProperty>
    {
        public ExpressionPropertyEntityConfiguration() : base("ExpressionPropertyId")
        {
            HasRequired(x => x.LeftPropertyValue)
                .WithMany()
                .HasForeignKey(x => x.LeftPropertyValueId);

            HasRequired(x => x.RightPropertyValue)
                .WithMany()
                .HasForeignKey(x => x.RightPropertyValueId);
        }
    }
}