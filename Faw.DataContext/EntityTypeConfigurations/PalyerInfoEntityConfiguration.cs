using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class PalyerInfoEntityConfiguration : BaseEntityTypeConfiguration<PlayerInfo>
    {
        public PalyerInfoEntityConfiguration() : base("PlayerInfoId")
        {
            Property(pi => pi.ExpirienceAmount)
                .HasPrecision(25, 5);
        }
    }
}