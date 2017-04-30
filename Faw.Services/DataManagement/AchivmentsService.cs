using System;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class AchivmentsService: Service, IAchivmentsService
    {
        public AchivmentsService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory)
            : base(mapper, contextScopeFactory)
        {
        }

        public void ApplyUserAchivments(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}