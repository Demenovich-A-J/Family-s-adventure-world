using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ClaimEntityConfiguration : EntityTypeConfiguration<Claim>
    {
        public ClaimEntityConfiguration()
        {
            HasKey(c => c.EntityId);

            Property(c => c.EntityId)
                .HasColumnName("ClaimId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}