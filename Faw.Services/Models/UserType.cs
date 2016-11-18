using System;
using System.Collections.Generic;

namespace Faw.Services.Models
{
    public class UserType
    {
        public Guid UserTypeId { get; set; }
        public string Name { get; set; }

        public virtual IList<Claim> Claims { get; set; }
    }
}