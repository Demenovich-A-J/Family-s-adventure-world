using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AchivmentEntityConfiguration : BaseEntityTypeConfiguration<Achivment>
    {
        public AchivmentEntityConfiguration() : base("AchivmentId")
        {
            HasMany(x => x.ExpressionProperties)
                .WithRequired(x => x.Achivment)
                .HasForeignKey(x => x.AchivmentId);
        }
    }
}