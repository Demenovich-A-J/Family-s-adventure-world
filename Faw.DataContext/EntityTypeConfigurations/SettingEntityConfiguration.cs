using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class SettingEntityConfiguration : EntityTypeConfiguration<Setting>
    {
        public SettingEntityConfiguration()
        {
            HasKey(s => s.EntityId);

            Property(s => s.EntityId)
                .HasColumnName("SettingId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}