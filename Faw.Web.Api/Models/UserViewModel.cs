using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Faw.Services.Models.Enums;

namespace Faw.Web.Api.Models
{
    public class UserViewModel
    {
        public Guid UserId { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserTypeId { get; set; }
        public Guid PlayerInfoId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public AccountViewModel Account { get; set; }
        public UserTypeViewModel UserType { get; set; }
        public PlayerInfoViewModel PlayerInfo { get; set; }

        public IList<QuestViewModel> Quests { get; set; }
    }
}