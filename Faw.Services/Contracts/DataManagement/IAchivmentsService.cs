using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IAchivmentsService
    {
        void ApplyUserAchivments(Guid userId);
        void Create(Achivment achivment);
        void Update(Achivment achivment);
    }
}