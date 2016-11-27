using Faw.Services.Models;

namespace Faw.Services.Contracts.QueryContracts
{
    public interface IUserTypeQueryService
    {
        UserType GetByName(string name);
    }
}