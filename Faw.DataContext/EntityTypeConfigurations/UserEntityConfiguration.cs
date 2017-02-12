using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserEntityConfiguration : BaseEntityTypeConfiguration<User>
    {
        public UserEntityConfiguration() : base("UserId")
        {
            HasRequired(u => u.UserType)
                .WithMany()
                .HasForeignKey(u => u.UserTypeId);

            Property(u => u.GenderString)
                .HasColumnName("Gender");

            Ignore(u => u.Gender);

            HasRequired(u => u.PlayerInfo)
                .WithMany()
                .HasForeignKey(u => u.PlayerInfoId);

            HasOptional(u => u.Family)
                .WithMany()
                .HasForeignKey(u => u.FamilyId);
        }
    }
}