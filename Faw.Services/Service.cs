using AutoMapper;
using Mehdime.Entity;

namespace Faw.Services
{
    public abstract class Service
    {
        protected readonly IDbContextScopeFactory _contextScopeFactory;
        protected readonly IMapper _mapper;

        protected Service(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory)
        {
            _mapper = mapper;
            _contextScopeFactory = contextScopeFactory;
        }
    }
}