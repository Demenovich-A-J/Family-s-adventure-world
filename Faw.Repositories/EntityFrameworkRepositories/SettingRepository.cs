using System;
using System.Linq;
using Core.DataContext.Contracts;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class SettingRepository : Repository<Setting>, ISettingRepository
    {
        public SettingRepository(IDataContext dataContext) : base(dataContext)
        {
        }

        public Setting GetById(Guid settingId)
        {
            return DataContext.Query<Setting>().FirstOrDefault(x => x.SettingId == settingId);
        }
    }
}