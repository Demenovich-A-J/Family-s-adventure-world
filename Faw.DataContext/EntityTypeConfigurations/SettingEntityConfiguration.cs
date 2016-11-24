using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class SettingEntityConfiguration : BaseEntityTypeConfiguration<Setting>
    {
        public SettingEntityConfiguration() : base("SettingId")
        {
           
        }
    }
}