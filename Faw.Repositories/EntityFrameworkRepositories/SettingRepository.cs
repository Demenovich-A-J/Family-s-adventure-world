using System;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class SettingRepository : Repository<Setting>, ISettingRepository
    {
        public SettingRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}