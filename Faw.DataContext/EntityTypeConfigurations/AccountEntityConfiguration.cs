using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AccountEntityConfiguration : BaseEntityTypeConfiguration<Account>
    {
        public AccountEntityConfiguration() : base("AccountId")
        {
            HasMany(x => x.Users)
                .WithRequired(x => x.Account)
                .HasForeignKey(x => x.AccountId);
        }
    }
}