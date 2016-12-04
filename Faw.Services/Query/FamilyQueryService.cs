using AutoMapper;
using Faw.Services.Contracts.Query;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class FamilyQueryService : Service, IFamilyQueryService
    {
        public FamilyQueryService(
            IMapper mapper, 
            IDbContextScopeFactory contextScopeFactory) 
            : base(mapper, contextScopeFactory)
        {

        }


    }
}