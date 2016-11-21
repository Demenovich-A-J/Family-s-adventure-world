using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserTypeEntityConfiguration : EntityTypeConfiguration<UserType>
    {
        public UserTypeEntityConfiguration()
        {
            HasKey(ut => ut.EntityId);

            Property(ut => ut.EntityId)
                .HasColumnName("UserTypeId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}