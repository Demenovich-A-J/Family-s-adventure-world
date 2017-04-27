using System;

namespace Faw.Services.Models
{
    public class UserAchivment
    {
        public Guid UserAchivmentId { get; set; }
        public Guid UserId { get; set; }
        public Guid AchivmentId { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}