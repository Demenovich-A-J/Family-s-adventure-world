using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class PropertyValueEntityConfiguration : BaseEntityTypeConfiguration<PropertyValue>
    {
        public PropertyValueEntityConfiguration() : base("PropertyValueId")
        {
        }
    }
}