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
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<UserType>(_userTypeRepository.Get(name));
            }
        }
    }
}