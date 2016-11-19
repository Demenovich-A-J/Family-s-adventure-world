using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class QuestEntityConfiguration : EntityTypeConfiguration<Quest>
    {
        public QuestEntityConfiguration()
        {
            HasKey(q => q.QuestId);

            Property(q => q.QuestId)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
        }
    }
}