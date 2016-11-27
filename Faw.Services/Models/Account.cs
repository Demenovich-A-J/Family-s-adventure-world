using System;

namespace Faw.Services.Models
{
    public class Account
    {
        public Guid AccountId { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }

        public string UserType { get; set; }

        public Guid? Token { get; set; }

        public DateTime? TokenExpireDate { get; set; }
        public DateTime? VerifiedOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}