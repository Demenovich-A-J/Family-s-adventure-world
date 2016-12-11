using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class PalyerInfoEntityConfiguration : BaseEntityTypeConfiguration<PlayerInfo>
    {
        public PalyerInfoEntityConfiguration() : base("PlayerInfoId")
        {
        }
    }
}