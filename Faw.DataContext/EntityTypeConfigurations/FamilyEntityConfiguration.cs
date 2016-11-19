using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class FamilyEntityConfiguration : EntityTypeConfiguration<Family>
    {
        public FamilyEntityConfiguration()
        {
            HasKey(f => f.FamilyId);

            Property(f => f.FamilyId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            HasRequired(f => f.CreatedBy)
                .WithMany()
                .HasForeignKey(f => f.CreatedById);

            HasMany(f => f.FamilyMemebers)
                .WithRequired(u => u.Family)
                .HasForeignKey(u => u.FamilyId);
        }
    }
}