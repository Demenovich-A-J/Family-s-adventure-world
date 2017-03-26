using System;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models
{
    public class Quest
    {
        public Quest()
        {
            QuestСomplexity = QuestСomplexity.Easy;
        }

        public Guid QuestId { get; set; }

        public Guid? ParentQuestId { get; set; }
        public Guid CreatedById { get; set; }
        public Guid FamilyId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public decimal Expirience { get; set; }
        public decimal? Coins { get; set; }

        public int RequiredLevel { get; set; }

        public QuestСomplexity QuestСomplexity { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public Quest ParentQuest { get; set; }
        public User CreatedBy { get; set; }
        public Family Family { get; set; }
    }
}