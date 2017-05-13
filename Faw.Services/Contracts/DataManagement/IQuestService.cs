using System;
using Faw.Services.Models;
using Faw.Services.Models.Enums;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IQuestService
    {
        void Create(Quest quest);
        void Edit(Quest quest);

        void AssignQuestUser(Guid userId, Guid questId);

        void UpdateQuestStatus(Guid userQuestId, UserQuestStatus status);
    }
}