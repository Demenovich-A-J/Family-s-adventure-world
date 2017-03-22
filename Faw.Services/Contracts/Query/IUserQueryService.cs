using System;
using System.Collections.Generic;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IUserQueryService
    {
        User Get(Guid userId);
        User Get(string emailOrLogin);

        IEnumerable<User> Find(string searchTerm);
    }
}