using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserTypeEntityConfiguration : BaseEntityTypeConfiguration<UserType>
    {
        public UserTypeEntityConfiguration() : base("UserTypeId")
        {
            HasMany(ut => ut.Claims)
                .WithMany()
                .Map(ut =>
                {
                    ut.MapLeftKey("UserTypeId");
                    ut.MapRightKey("ClaimId");
                    ut.ToTable("UserTypeClaim");
                });
        }
    }
}