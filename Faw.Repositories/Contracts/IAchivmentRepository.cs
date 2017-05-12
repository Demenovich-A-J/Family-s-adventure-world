using System;
using System.Linq;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IAchivmentRepository : IRepository<Achivment>
    {
        IQueryable<UserAchivment> GetUserAchivment(Guid userId);
        Achivment Get(Guid achivmentId);
    }
}