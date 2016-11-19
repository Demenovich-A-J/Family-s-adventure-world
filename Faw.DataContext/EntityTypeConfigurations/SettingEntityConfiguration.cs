using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class SettingEntityConfiguration : EntityTypeConfiguration<Setting>
    {
        public SettingEntityConfiguration()
        {
            HasKey(s => s.SettingId);

            Property(s => s.SettingId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}