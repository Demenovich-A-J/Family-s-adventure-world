using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserAchivmentEntiryConfiguration : BaseEntityTypeConfiguration<UserAchivment>
    {
        public UserAchivmentEntiryConfiguration() : base("UserAchivmentId")
        {
        }
    }
}