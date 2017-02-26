using System;
using System.ComponentModel.DataAnnotations;
using Faw.Services.Models.Enums;

namespace Faw.Web.Api.Models
{
    public class AccountViewModel
    {
        public Guid AccountId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Login { get; set; }

        [Required]
        [MaxLength(500)]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [MinLength(6)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string RepeatPassword { get; set; }

        public AccountStatus Status { get; set; }

        public string UserType { get; set; } = "Admin";

        public Guid? Token { get; set; }

        public DateTime? TokenExpireDate { get; set; }
        public DateTime? VerifiedOn { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}