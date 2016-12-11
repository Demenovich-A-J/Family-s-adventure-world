using System;
using System.Collections.Generic;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IQuestQueryService
    {
        Quest GetById(Guid questId);

        /// <param name="userId">Id of user for whom belong quests.</param>
        IEnumerable<Quest> GetUserQuests(Guid userId);
    }
}