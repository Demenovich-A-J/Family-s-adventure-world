using System;
using AutoMapper;
using Core.Infrastructure;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagementContracts;
using Faw.Services.Contracts.QueryContracts;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagementServices
{
    public class UserService : Service, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAccountRepository _accountRepository;

        private readonly IUserTypeQueryService _userTypeQueryService;
        private readonly IAccountQueryService _accountQueryService;

        public UserService(
            IUserRepository userRepository, 
            IMapper mapper, 
            IAccountRepository accountRepository, 
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeQueryService userTypeQueryService, 
            IAccountQueryService accountQueryService) : base(mapper, contextScopeFactory)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
            _userTypeQueryService = userTypeQueryService;
            _accountQueryService = accountQueryService;
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

        public bool Verify(Guid token)
        {
            var account = _accountQueryService.GetByToken(token);

            if (account == null)
                throw new ArgumentNullException(
                    $"Account with {token} not found. This case may be when user request another activation email. Or user already verify his account.");

            var now = DateTime.UtcNow;

            if (account.TokenExpireDate > now)
                return false;

            using (var contextScope = _contextScopeFactory.Create())
            {
                account.VerifiedOn = DateTime.Now;
                account.Token = null;
                account.TokenExpireDate = null;

                _accountRepository.Update(_mapper.Map<Faw.Models.Domain.Account>(account));

                contextScope.SaveChanges();
            }

            return true;
        }

        public bool Authenticate(string emailOrlogin, string password)
        {
            var account = _accountQueryService.GetByEmailOrLogin(emailOrlogin);

            return account != null && SaltedHash.Verify(password, account.PasswordHash, account.PasswordSalt);
        }

        public void Edit(User user)
        {
            throw new NotImplementedException();
        }
    }
}