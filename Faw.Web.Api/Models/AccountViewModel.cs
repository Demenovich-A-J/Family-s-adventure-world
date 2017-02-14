using System;
using System.ComponentModel.DataAnnotations;
using Faw.Services.Models.Enums;

namespace Faw.Web.Api.Models
{
    public class AccountViewModel
    {
        public Guid AccountId { get; set; }

        [Required]
        public string Login { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string RepeatPassword { get; set; }

        public AccountStatus Status { get; set; }

        [Required]
        public string UserType { get; set; }

        public Guid? Token { get; set; }

        public DateTime? TokenExpireDate { get; set; }
        public DateTime? VerifiedOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}