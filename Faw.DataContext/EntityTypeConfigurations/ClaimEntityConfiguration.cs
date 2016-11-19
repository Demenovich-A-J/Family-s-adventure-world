using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ClaimEntityConfiguration : EntityTypeConfiguration<Claim>
    {
        public ClaimEntityConfiguration()
        {
            HasKey(c => c.ClaimId);

            Property(c => c.ClaimId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}