using System;
using System.Collections.Generic;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class User : BaseEntity
    {
        public Guid AccountId { get; set; }
        public Guid UserTypeId { get; set; }
        public Guid? FamilyId { get; set; }
        public Guid PlayerInfoId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string GenderString
        {
            get { return Gender.ToString(); }
            set { Gender = (Gender)Enum.Parse(typeof(Gender), value); }
        }

        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public virtual Account Account { get; set; }
        public virtual UserType UserType { get; set; }
        public virtual Family Family { get; set; }
        public virtual PlayerInfo PlayerInfo { get; set; }

        public virtual IList<Quest> Quests { get; set; }
    }
}