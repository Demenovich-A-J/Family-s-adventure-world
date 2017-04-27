using System;
using System.Collections.Generic;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IAchivmentsQueryService
    {
        Achivment Get(Guid achivmentId);

        IEnumerable<Achivment> GetUserAchivments(Guid userId);

        IEnumerable<Achivment> Get();
    }
}