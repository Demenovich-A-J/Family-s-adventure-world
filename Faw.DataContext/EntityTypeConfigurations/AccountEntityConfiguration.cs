using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AccountEntityConfiguration : BaseEntityTypeConfiguration<Account>
    {
        public AccountEntityConfiguration() : base("AccountId")
        {
            
        }
    }
}