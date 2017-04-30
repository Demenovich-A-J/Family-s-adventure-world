using System;

namespace Faw.Models.Domain
{
    public class UserAchivment : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid AchivmentId { get; set; }
        public DateTime CreatedOn { get; set; }

        public virtual User User { get; set; }
        public virtual Achivment Achivment { get; set; }
    }
}