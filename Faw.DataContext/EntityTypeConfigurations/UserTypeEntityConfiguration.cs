using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserTypeEntityConfiguration : BaseEntityTypeConfiguration<UserType>
    {
        public UserTypeEntityConfiguration() : base("UserTypeId")
        {

        }
    }
}