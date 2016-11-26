using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Models;
using Faw.Services.Contracts.QueryServices;
using Mehdime.Entity;

namespace Faw.Services.QueryServices
{
    public class UserQueryService : IUserQueryService
    {
        private readonly IDbContextScopeFactory _contextScopeFactory;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserQueryService(
            IDbContextScopeFactory contextScopeFactory, 
            IUserRepository userRepository, 
            IMapper mapper)
        {
            _contextScopeFactory = contextScopeFactory;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public User GetUserById(Guid userId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<User>(_userRepository.GetById(userId));
            }
        }

        public User GetUserByEmailOrLogin(string email, string login)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return
                    _mapper.Map<User>(
                        _userRepository.GetWhere(
                            x =>
                                x.Email.Equals(email, StringComparison.OrdinalIgnoreCase) ||
                                x.Account.UserName.Equals(login, StringComparison.OrdinalIgnoreCase)));
            }
        }
    }
}