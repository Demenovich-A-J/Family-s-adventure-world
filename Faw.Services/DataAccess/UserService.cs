using System;
using AutoMapper;
using Core.Infrastructure;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataAccess;
using Faw.Services.Contracts.QueryServices;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataAccess
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserTypeQueryService _userTypeQueryService;
        private readonly IAccountRepository _accountRepository;
        private readonly IDbContextScopeFactory _contextScopeFactory;

        public UserService(
            IUserRepository userRepository, 
            IMapper mapper, 
            IAccountRepository accountRepository, 
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeQueryService userTypeQueryService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _accountRepository = accountRepository;
            _contextScopeFactory = contextScopeFactory;
            _userTypeQueryService = userTypeQueryService;
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

            var userType = _userTypeQueryService.GetByName(user.Account.UserType);

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


    }
}