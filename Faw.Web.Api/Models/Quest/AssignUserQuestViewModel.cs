using System;
using System.ComponentModel.DataAnnotations;

namespace Faw.Web.Api.Models.Quest
{
    public class AssignUserQuestViewModel
    {
        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid QuestId { get; set; }
    }
}