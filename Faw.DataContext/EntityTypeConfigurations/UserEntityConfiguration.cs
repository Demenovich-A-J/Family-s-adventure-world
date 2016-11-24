using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
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
        }
    }
}