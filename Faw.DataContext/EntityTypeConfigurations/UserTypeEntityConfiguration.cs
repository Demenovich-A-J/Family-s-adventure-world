using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserTypeEntityConfiguration : EntityTypeConfiguration<UserType>
    {
        public UserTypeEntityConfiguration()
        {
            HasKey(ut => ut.UserTypeId);

            Property(ut => ut.UserTypeId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}