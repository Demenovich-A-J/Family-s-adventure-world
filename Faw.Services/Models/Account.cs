using System;
using System.Collections.Generic;

namespace Faw.Services.Models
{
    public class Account
    {
        public Guid AccountId { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public Guid Token { get; set; }

        public DateTime TokenExpireDate { get; set; }
        public DateTime VerifiedOn { get; set; }

        public virtual IList<User> Users { get; set; }
    }
}