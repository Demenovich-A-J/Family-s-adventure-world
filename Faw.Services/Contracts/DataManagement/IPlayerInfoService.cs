using System;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IPlayerInfoService
    {
        void AdjustPlayerExpirience(Guid userId, float expirienceAmount);
    }
}