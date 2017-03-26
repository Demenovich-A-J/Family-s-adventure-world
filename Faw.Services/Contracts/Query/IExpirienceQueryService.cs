using System;
using System.Linq;
using Faw.Services.Models;
using Faw.Services.Models.Enums;
using Faw.Services.Models.Results;

namespace Faw.Services.Contracts.Query
{
    public interface IExpirienceQueryService
    {
        IOrderedEnumerable<Expirience> GetExpirienceList();

        decimal CalculateExpirience(int requiredLevel, QuestСomplexity questСomplexity);

        ApplayExpirienceResult ApplayExpirience(PlayerInfo playerInfo, decimal expirience);
    }
}