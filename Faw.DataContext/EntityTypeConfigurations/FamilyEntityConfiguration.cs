using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class FamilyEntityConfiguration : BaseEntityTypeConfiguration<Family>
    {
        public FamilyEntityConfiguration() : base("FamilyId")
        {
            HasRequired(f => f.CreatedBy)
                .WithMany()
                .HasForeignKey(f => f.CreatedById);

            HasMany(f => f.FamilyMemebers)
                .WithRequired(u => u.Family)
                .HasForeignKey(u => u.FamilyId);
        }
    }
}