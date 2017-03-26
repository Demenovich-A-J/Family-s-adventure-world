using System;
using System.Collections.Generic;
using System.Linq;
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

        public User Get(Guid userId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<User>(_userRepository.GetById(userId));
            }
        }

        public User Get(string emailOrLogin)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<User>(_userRepository.Get(emailOrLogin));
            }
        }

        public IEnumerable<User> Find(string searchTerm)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return
                    Mapper.Map<IEnumerable<User>>(
                        _userRepository.Find(searchTerm));
            }
        }
    }
}