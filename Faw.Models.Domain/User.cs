using System;
using System.Collections.Generic;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class User
    {
        public Guid UserId { get; set; }
        public Guid AccountId { get; set; }
        public Guid UserTypeId { get; set; }
        public Guid FamilyId { get; set; }

        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public virtual Account Account { get; set; }
        public virtual UserType UserType { get; set; }
        public virtual Family Family { get; set; }

        public virtual IList<Quest> Quests { get; set; }
    }
}