using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class ItemEntityConfiguration : BaseEntityTypeConfiguration<Item>
    {
        public ItemEntityConfiguration() : base("ItemId")
        {
            
        }
    }
}