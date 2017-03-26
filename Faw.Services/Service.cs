using AutoMapper;
using Mehdime.Entity;

namespace Faw.Services
{
    public abstract class Service
    {
        protected readonly IDbContextScopeFactory ContextScopeFactory;
        protected readonly IMapper Mapper;

        protected Service(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory)
        {
            Mapper = mapper;
            ContextScopeFactory = contextScopeFactory;
        }
    }
}