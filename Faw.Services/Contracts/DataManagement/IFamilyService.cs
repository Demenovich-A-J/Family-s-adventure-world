using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IFamilyService
    {
        void Create(Family family);
        void Edit(Family family);
        void AddNewFamilyMember(Guid familyId, Guid userId);
    }
}