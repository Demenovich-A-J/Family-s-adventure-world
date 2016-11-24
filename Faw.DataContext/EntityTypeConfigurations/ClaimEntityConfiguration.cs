using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ClaimEntityConfiguration : BaseEntityTypeConfiguration<Claim>
    {
        public ClaimEntityConfiguration() : base("ClaimId")
        {
            
        }
    }
}