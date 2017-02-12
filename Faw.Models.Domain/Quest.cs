using System;

namespace Faw.Models.Domain
{
    public class Quest : BaseEntity
    {
        public Guid? ParentQuestId { get; set; }
        public Guid CreatedById { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }

        public bool IsPublic { get; set; }

        public decimal Expirience { get; set; }
        public decimal? Coins { get; set; }

        public int RequiredLevel { get; set; }

        public DateTime CreateOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual Quest ParentQuest { get; set; }
        public virtual User CreatedBy { get; set; }
    }
}