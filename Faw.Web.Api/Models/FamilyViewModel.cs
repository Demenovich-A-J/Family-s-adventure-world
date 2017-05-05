using System;
using System.Collections.Generic;

namespace Faw.Web.Api.Models
{
    public class FamilyViewModel
    {
        public Guid FamilyId { get; set; }
        public Guid CreatedById { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Goal { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual UserViewModel CretedBy { get; set; }
        public virtual IList<UserViewModel> FamilyMemebers { get; set; }
    }
}