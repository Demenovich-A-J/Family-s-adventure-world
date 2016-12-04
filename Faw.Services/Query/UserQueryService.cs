using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class UserQueryService : Service, IUserQueryService
    {
        private readonly IUserRepository _userRepository;

        public UserQueryService(
            IDbContextScopeFactory contextScopeFactory, 
            IUserRepository userRepository, 
            IMapper mapper) : base(mapper, contextScopeFactory)
        {
            _userRepository = userRepository;
        }

        public User GetUserById(Guid userId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<User>(_userRepository.GetById(userId));
            }
        }
    }
}