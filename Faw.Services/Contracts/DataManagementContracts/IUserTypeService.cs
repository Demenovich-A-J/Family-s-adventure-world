using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagementContracts
{
    public interface IUserTypeService
    {
        UserType GetByName(string name);
    }
}