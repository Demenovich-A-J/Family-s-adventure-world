using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserAchivmentEntiryConfiguration : BaseEntityTypeConfiguration<UserAchivment>
    {
        public UserAchivmentEntiryConfiguration() : base("UserAchivmentId")
        {
            HasRequired(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId);

            HasRequired(x => x.Achivment)
                .WithMany()
                .HasForeignKey(x => x.AchivmentId);
        }
    }
}