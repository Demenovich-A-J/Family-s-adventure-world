using System;
using Faw.Services.Models.Enums;

namespace Faw.Web.Api.Models.Helper
{
    public class UpdateQuestStatusViewModel
    {
        public Guid UserQuestId { get; set; }
        public UserQuestStatus Status { get; set; }
    }
}