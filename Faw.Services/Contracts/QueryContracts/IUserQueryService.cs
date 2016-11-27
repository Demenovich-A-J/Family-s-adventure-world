using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.QueryContracts
{
    public interface IUserQueryService
    {
        User GetUserById(Guid userId);
    }
}