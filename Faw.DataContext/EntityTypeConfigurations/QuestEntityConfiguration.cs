using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class QuestEntityConfiguration : EntityTypeConfiguration<Quest>
    {
        public QuestEntityConfiguration()
        {
            HasKey(q => q.EntityId);

            Property(q => q.EntityId)
                .HasColumnName("QuestId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}