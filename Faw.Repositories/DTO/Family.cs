using System;
using System.Collections.Generic;

namespace Faw.Repositories.DTO
{
    public class Family
    {
        public Guid FamilyId { get; set; }
        public Guid CreatedById { get; set; }

        public string Name { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual User CretedBy { get; set; }
        public virtual IList<User> FamilyMemebers { get; set; }
    }
}