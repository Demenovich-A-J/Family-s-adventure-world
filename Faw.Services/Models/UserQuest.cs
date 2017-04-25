using System;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models
{
    public class UserQuest
    {
        public Guid UserQuestId { get; set; }
        public Guid UserId { get; set; }
        public Guid QuestId { get; set; }
        public Guid? ParentUserQuestId { get; set; }

        public UserQuestStatus UserQuestStatus { get; set; }
        public QuestСomplexity QuestСomplexity { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public User User { get; set; }
        public Quest Quest { get; set; }
        public UserQuest ParentUserQuest { get; set; }
    }
}