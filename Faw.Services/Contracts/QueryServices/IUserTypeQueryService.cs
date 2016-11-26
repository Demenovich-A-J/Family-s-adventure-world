using Faw.Services.Models;

namespace Faw.Services.Contracts.QueryServices
{
    public interface IUserTypeQueryService
    {
        UserType GetByName(string name);
    }
}