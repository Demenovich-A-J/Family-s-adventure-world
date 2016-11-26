using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.QueryServices;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.QueryServices
{
    public class UserTypeQueryService : IUserTypeQueryService
    {
        private readonly IDbContextScopeFactory _contextScopeFactory;
        private readonly IUserTypeRepository _userTypeRepository;
        private readonly IMapper _mapper;

        public UserTypeQueryService(
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeRepository userTypeRepository,
            IMapper mapper)
        {
            _contextScopeFactory = contextScopeFactory;
            _userTypeRepository = userTypeRepository;
            _mapper = mapper;
        }

        public UserType GetByName(string name)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<UserType>(_userTypeRepository.GetByName(name));
            }
        }
    }
}