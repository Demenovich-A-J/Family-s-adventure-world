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
        public Guid? FamilyId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string City { get; set; }

        [Required]
        public Gender Gender { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public AccountViewModel Account { get; set; }
        public UserTypeViewModel UserType { get; set; }
        public PlayerInfoViewModel PlayerInfo { get; set; }
        public FamilyViewModel Family { get; set; }

        public IList<QuestViewModel> Quests { get; set; }
    }
}