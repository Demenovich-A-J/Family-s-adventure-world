using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserEntityConfiguration : EntityTypeConfiguration<User>
    {
        public UserEntityConfiguration()
        {
            HasKey(u => u.EntityId);

            Property(u => u.EntityId)
                .HasColumnName("UserId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            HasRequired(u => u.UserType)
                .WithMany()
                .HasForeignKey(u => u.UserTypeId);

            Property(u => u.GenderString)
                .HasColumnName("Gender");

            Ignore(u => u.Gender);
        }
    }
}