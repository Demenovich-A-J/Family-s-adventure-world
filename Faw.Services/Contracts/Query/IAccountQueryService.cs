using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IAccountQueryService
    {
        Account GetByToken(Guid token);
        Account GetByEmailOrLogin(string emailOrlogin);
    }
}