﻿using System;
using System.Collections.Generic;

namespace Faw.Models.Domain
{
    public class Family : BaseEntity
    {
        public Guid CreatedById { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Goal { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual User CreatedBy { get; set; }
        public virtual IList<User> FamilyMemebers { get; set; }
    }
}