using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class QuestEntityConfiguration : BaseEntityTypeConfiguration<Quest>
    {
        public QuestEntityConfiguration() : base("QuestId")
        {
            HasRequired(x => x.CreatedBy)
                .WithMany()
                .HasForeignKey(x => x.CreatedById);

            HasOptional(x => x.ParentQuest)
                .WithMany()
                .HasForeignKey(x => x.ParentQuestId);
        }
    }
}