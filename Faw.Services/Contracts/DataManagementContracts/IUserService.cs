using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagementContracts
{
    public interface IUserService
    {
        void Register(User user);
        bool Verify(Guid token);
        bool Authenticate(string emailOrlogin, string password);
        void Edit(User user);
    }
}