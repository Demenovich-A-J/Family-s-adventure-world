using System;
using System.Collections.Generic;
using Faw.Services.Models.Enums;

namespace Faw.Web.Api.Models
{
    public class UserViewModel
    {
        public Guid UserId { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserTypeId { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public AccountViewModel Account { get; set; }
        public UserTypeViewModel UserType { get; set; }
        public IList<QuestViewModel> Quests { get; set; }
    }
}