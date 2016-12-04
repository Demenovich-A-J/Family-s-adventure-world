using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IUserQueryService
    {
        User GetUserById(Guid userId);
    }
}