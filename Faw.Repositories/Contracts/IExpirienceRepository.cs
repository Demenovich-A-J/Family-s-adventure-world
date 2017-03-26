using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IExpirienceRepository : IRepository<Expirience>
    {
        Expirience Get(int level);
    }
}