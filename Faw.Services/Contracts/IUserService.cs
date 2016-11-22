using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts
{
    public interface IUserService
    {
        void Register(User user);
        User GetUserById(Guid userId);

    }
}