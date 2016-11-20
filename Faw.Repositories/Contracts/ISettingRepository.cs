using System;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface ISettingRepository : IRepository<Setting>
    {
        Setting GetById(Guid settingId);
    }
}