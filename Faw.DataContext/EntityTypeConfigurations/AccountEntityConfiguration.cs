using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AccountEntityConfiguration : BaseEntityTypeConfiguration<Account>
    {
        public AccountEntityConfiguration() : base("AccountId")
        {

            HasKey(a => a.EntityId);

            HasMany(x => x.Users)
                .WithRequired(x => x.Account)
                .HasForeignKey(x => x.AccountId);
        }
    }
}