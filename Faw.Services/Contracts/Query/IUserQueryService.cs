using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IUserQueryService
    {
        User Get(Guid userId);
        User Get(string emailOrLogin);
    }
}