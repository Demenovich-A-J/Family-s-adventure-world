using System;
using System.Collections.Generic;

namespace Faw.Models.Domain
{
    public class UserType
    {
        public Guid UserTypeId { get; set; }
        public string Name { get; set; }

        public virtual IList<Claim> Claims { get; set; }
    }
}