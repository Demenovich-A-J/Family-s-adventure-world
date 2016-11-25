using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataAccess
{
    public class UserTypeService : IUserTypeService
    {
        private readonly IDbContextScopeFactory _contextScopeFactory;
        private readonly IUserTypeRepository _userTypeRepository;
        private readonly IMapper _mapper;

        public UserTypeService(
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
            using (var dbContextScope = _contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<UserType>(_userTypeRepository.GetByName(name));
            }
        }
    }
}