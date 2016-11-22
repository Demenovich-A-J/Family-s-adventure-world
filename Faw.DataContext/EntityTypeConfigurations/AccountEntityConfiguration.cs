using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class AccountEntityConfiguration : EntityTypeConfiguration<Account>
    {
        public AccountEntityConfiguration()
        {
            Property(a => a.EntityId)
                .HasColumnName("AccountId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            HasKey(a => a.EntityId);

            HasMany(x => x.Users)
                .WithRequired(x => x.Account)
                .HasForeignKey(x => x.AccountId);
        }
    }
}