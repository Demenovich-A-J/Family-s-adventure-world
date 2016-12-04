using System;
using System.Collections.Generic;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class Account : BaseEntity
    {
        public string UserName { get; set; }
        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public AccountStatus Status { get; set; }

        public Guid? Token { get; set; }

        public DateTime? TokenExpireDate { get; set; }
        public DateTime? VerifiedOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual IList<User> Users { get; set; }
    }
}