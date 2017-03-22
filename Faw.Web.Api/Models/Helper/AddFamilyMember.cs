using System;

namespace Faw.Web.Api.Models.Helper
{
    public class AddFamilyMember
    {
        public Guid UserId { get; set; }
        public Guid FamilyId { get; set; }
    }
}