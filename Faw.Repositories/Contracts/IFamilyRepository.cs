using System;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IFamilyRepository : IRepository<Family>
    {
        Family GetUserFamily(Guid userId);
    }
}