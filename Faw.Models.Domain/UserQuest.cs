using System;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class UserQuest : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid QuestId { get; set; }
        public Guid? ParentUserQuestId { get; set; }

        public UserQuestStatus UserQuestStatus { get; set; }
        public string Status { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual User User { get; set; }
        public virtual Quest Quest { get; set; }
        public virtual UserQuest ParentUserQuest { get; set; }
    }
}