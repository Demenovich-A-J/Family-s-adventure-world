using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class QuestEntityConfiguration : BaseEntityTypeConfiguration<Quest>
    {
        public QuestEntityConfiguration() : base("QuestId")
        {

        }
    }
}