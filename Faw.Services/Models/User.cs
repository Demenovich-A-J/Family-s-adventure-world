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

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public Account Account { get; set; }
        public UserType UserType { get; set; }
        public IList<Quest> Quests { get; set; }
    }
}