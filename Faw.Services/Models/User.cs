using System;
using System.Collections.Generic;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models
{
    public class User
    {
        public Guid UserId { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserTypeId { get; set; }
        public Guid? FamilyId { get; set; }
        public Guid PlayerInfoId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public string City { get; set; }

        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public Account Account { get; set; }
        public UserType UserType { get; set; }
        public Family Family { get; set; }
        public PlayerInfo PlayerInfo { get; set; }

        public IList<Quest> Quests { get; set; }
    }
}