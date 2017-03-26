using System;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class Quest : BaseEntity
    {
        public Guid? ParentQuestId { get; set; }
        public Guid CreatedById { get; set; }
        public Guid FamilyId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public decimal Expirience { get; set; }
        public decimal? Coins { get; set; }

        public QuestСomplexity QuestСomplexity { get; set; }

        public string QuestСomplexityString
        {
            get { return QuestСomplexity.ToString(); }
            set { QuestСomplexity = (QuestСomplexity)Enum.Parse(typeof(QuestСomplexity), value); }
        }
        public int RequiredLevel { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual Quest ParentQuest { get; set; }
        public virtual User CreatedBy { get; set; }
        public virtual Family Family { get; set; }
    }
}