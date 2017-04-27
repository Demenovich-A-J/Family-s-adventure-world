using System;

namespace Faw.Models.Domain
{
    public class UserAchivment : BaseEntity
    {
        public Guid UserId { get; set; }
        public Guid AchivmentId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}