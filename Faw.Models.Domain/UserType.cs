using System.Collections.Generic;

namespace Faw.Models.Domain
{
    public class UserType : BaseEntity
    {
        public string Name { get; set; }

        public virtual IList<Claim> Claims { get; set; }
    }
}