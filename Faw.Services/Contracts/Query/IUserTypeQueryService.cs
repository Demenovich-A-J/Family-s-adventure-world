using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IUserTypeQueryService
    {
        UserType GetByName(string name);
    }
}