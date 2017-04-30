using System;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IAchivmentsService
    {
        void ApplyUserAchivments(Guid userId);
    }
}