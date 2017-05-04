using System;
using System.Collections.Generic;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IQuestQueryService
    {
        Quest GetById(Guid questId);

        /// <param name="userId">Id of user for whom belong quests.</param>
        IEnumerable<Quest> GetQuests(Guid userId);

        IEnumerable<UserQuest> GetUserQuests(Guid userId);

        UserQuest GetUserQuest(Guid userQuestId);

        IEnumerable<Quest> GetFamilyQuests(Guid familyId);

        IEnumerable<Quest> GetAvailableFamilyUserQuests(Guid familyId, Guid userId);
    }
}