using Faw.Services.Models;

namespace Faw.Services.Contracts
{
    public interface IUserTypeService
    {
        UserType GetByName(string name);
    }
}