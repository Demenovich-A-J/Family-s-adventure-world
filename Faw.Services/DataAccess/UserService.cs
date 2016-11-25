using System;
using AutoMapper;
using Core.Infrastructure;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataAccess
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserTypeService _userTypeService;
        private readonly IAccountRepository _accountRepository;
        private readonly IDbContextScopeFactory _contextScopeFactory;

        public UserService(
            IUserRepository userRepository, 
            IMapper mapper, 
            IAccountRepository accountRepository, 
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeService userTypeService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _accountRepository = accountRepository;
            _contextScopeFactory = contextScopeFactory;
            _userTypeService = userTypeService;
        }

        public void Register(User user)
        {
            var domainUser = _mapper.Map<Faw.Models.Domain.User>(user);
            var sh = new SaltedHash(user.Account.Password);
            var now = DateTime.UtcNow;

            domainUser.Account.PasswordHash = sh.Hash;
            domainUser.Account.PasswordSalt = sh.Salt;

            domainUser.Account.CreatedOn = now;
            domainUser.Account.UpdatedOn = now;

            domainUser.Account.Token = Guid.NewGuid();
            domainUser.Account.TokenExpireDate = now.AddHours(1);

            var userType = _userTypeService.GetByName(user.Account.UserType);

            if (userType == null)
                throw new ArgumentNullException(nameof(userType));

            domainUser.UserTypeId = userType.UserTypeId;
            domainUser.AccountId = domainUser.Account.EntityId;

            using (var contextScope = _contextScopeFactory.Create())
            {
                _accountRepository.Insert(domainUser.Account);
                _userRepository.Insert(domainUser);

                contextScope.SaveChanges();
            }
        }

        public User GetUserById(Guid userId)
        {
            using (var dbContextScope = _contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<User>(_userRepository.GetById(userId));
            }
        }
    }
}