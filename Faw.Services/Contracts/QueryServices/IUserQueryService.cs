using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.QueryServices
{
    public interface IUserQueryService
    {
        User GetUserById(Guid userId);
        User GetUserByEmailOrLogin(string email, string login);
    }
}