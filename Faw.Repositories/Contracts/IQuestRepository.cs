using System;
using Faw.Models.Domain;
using Faw.Models.Domain.Enums;

namespace Faw.Repositories.Contracts
{
    public interface IQuestRepository : IRepository<Quest>
    {
        QuestСomplexity GetQuestСomplexity(Guid questId);
    }
}