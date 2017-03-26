using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class ExpirienceService: Service, IExpirienceService
    {
        public ExpirienceService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory) 
            : base(mapper, contextScopeFactory)
        {

        }
    }
}