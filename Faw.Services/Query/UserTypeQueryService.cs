using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class UserTypeQueryService : Service, IUserTypeQueryService
    {
        private readonly IUserTypeRepository _userTypeRepository;

        public UserTypeQueryService(
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeRepository userTypeRepository,
            IMapper mapper) : base(mapper, contextScopeFactory)
        {
            _userTypeRepository = userTypeRepository;
        }

        public UserType GetByName(string name)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return
                    _mapper.Map<UserType>(
                        _userTypeRepository.GetWhere(x => x.Name.Equals(name, StringComparison.OrdinalIgnoreCase)));
            }
        }
    }
}