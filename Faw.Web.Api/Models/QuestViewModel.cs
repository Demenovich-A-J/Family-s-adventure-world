using System;

namespace Faw.Web.Api.Models
{
    public class QuestViewModel
    {
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

        public DateTime CreateOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public QuestViewModel ParentQuest { get; set; }
        public UserViewModel CreatedBy { get; set; }
        public FamilyViewModel Family { get; set; }
    }
}