using AutoMapper;
using Faw.Services.Contracts.Query;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class AchivmentsQueryService : Service, IAchivmentsQueryService
    {
        public AchivmentsQueryService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory)
            : base(mapper, contextScopeFactory)
        {
        }


    }
}