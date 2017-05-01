using System;
using System.Linq;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IUserQuestRepository : IRepository<UserQuest>
    {
        IQueryable<UserQuest> GetUserQuests(Guid userId);
    }
}