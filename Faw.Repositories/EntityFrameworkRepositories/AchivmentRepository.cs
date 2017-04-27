﻿using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Mehdime.Entity;

namespace Faw.Repositories.EntityFrameworkRepositories
{
    public class AchivmentRepository : Repository<Achivment>, IAchivmentRepository
    {
        public AchivmentRepository(IAmbientDbContextLocator dataContext) : base(dataContext)
        {
        }
    }
}