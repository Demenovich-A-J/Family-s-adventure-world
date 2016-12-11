using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.Query
{
    public interface IFamilyQueryService
    {
        Family Get(Guid familyId);
    }
}