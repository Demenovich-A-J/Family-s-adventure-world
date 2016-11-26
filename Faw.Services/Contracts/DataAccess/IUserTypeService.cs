using Faw.Services.Models;

namespace Faw.Services.Contracts.DataAccess
{
    public interface IUserTypeService
    {
        UserType GetByName(string name);
    }
}