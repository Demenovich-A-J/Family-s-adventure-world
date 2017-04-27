using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AchivmentEntityConfiguration : BaseEntityTypeConfiguration<Achivment>
    {
        public AchivmentEntityConfiguration() : base("AchivmentId")
        {
        }
    }
}