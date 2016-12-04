using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IUserTypeService
    {
        UserType GetByName(string name);
    }
}