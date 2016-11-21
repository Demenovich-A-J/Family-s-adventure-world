using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ItemEntityConfiguration : EntityTypeConfiguration<Item>
    {
        public ItemEntityConfiguration()
        {
            HasKey(i => i.EntityId);

            Property(i => i.EntityId)
                .HasColumnName("ItemId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}