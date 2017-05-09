using System;
using AutoMapper;
using Core.Infrastructure;
using Faw.Models.Domain;
using Faw.Models.Domain.Enums;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Mehdime.Entity;
using User = Faw.Services.Models.User;

namespace Faw.Services.DataManagement
{
    public class UserService : Service, IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IAccountRepository _accountRepository;
        private readonly IPlayerInfoRepository _playerInfoRepository;

        private readonly IUserTypeQueryService _userTypeQueryService;
        private readonly IAccountQueryService _accountQueryService;

        public UserService(
            IUserRepository userRepository, 
            IMapper mapper, 
            IAccountRepository accountRepository, 
            IDbContextScopeFactory contextScopeFactory,
            IUserTypeQueryService userTypeQueryService, 
            IAccountQueryService accountQueryService,
            IPlayerInfoRepository playerInfoRepository) 
            : base(mapper, contextScopeFactory)
        {
            _userRepository = userRepository;
            _accountRepository = accountRepository;
            _userTypeQueryService = userTypeQueryService;
            _accountQueryService = accountQueryService;
            _playerInfoRepository = playerInfoRepository;
        }

        public Guid Register(User user)
        {
            var domainUser = Mapper.Map<Faw.Models.Domain.User>(user);
            var sh = new SaltedHash(user.Account.Password);
            var now = DateTime.UtcNow;

            domainUser.Account.PasswordHash = sh.Hash;
            domainUser.Account.PasswordSalt = sh.Salt;

            domainUser.Account.CreatedOn = now;
            domainUser.Account.UpdatedOn = now;

            domainUser.Account.Token = Guid.NewGuid();
            domainUser.Account.TokenExpireDate = now.AddHours(1);

            domainUser.Account.Status = AccountStatus.PendingActivation;

            var userType = _userTypeQueryService.GetByName(user.Account.UserType);

            if (userType == null)
                throw new ArgumentNullException(nameof(userType));

            domainUser.UserTypeId = userType.UserTypeId;
            domainUser.AccountId = domainUser.Account.EntityId;

            domainUser.PlayerInfo = new PlayerInfo
            {
                ExpirienceAmount = 0,
                Level = 1
            };

            using (var contextScope = ContextScopeFactory.Create())
            {
                _accountRepository.Insert(domainUser.Account);
                _playerInfoRepository.Insert(domainUser.PlayerInfo);
                _userRepository.Insert(domainUser);

                contextScope.SaveChanges();
            }

            return domainUser.Account.Token.Value;
        }

        public UserVerifyResult Verify(Guid token)
        {
            var account = _accountQueryService.GetByToken(token);

            if (account == null)
                return UserVerifyResult.TokenChanged;

            var now = DateTime.UtcNow;

            if (account.TokenExpireDate > now)
                return UserVerifyResult.TokenExpired;

            if (account.VerifiedOn.HasValue)
                return UserVerifyResult.AlreadyVerified;

            using (var contextScope = ContextScopeFactory.Create())
            {
                account.VerifiedOn = DateTime.Now;
                account.Token = null;
                account.TokenExpireDate = null;
                account.Status = Models.Enums.AccountStatus.Active;

                _accountRepository.Update(Mapper.Map<Account>(account));

                contextScope.SaveChanges();
            }

            return UserVerifyResult.Ok;
        }

        public void Edit(User user)
        {
            var domainUser = GetUserInternal(user.UserId);

            Mapper.Map(user, domainUser);
            
            using (var contextScope = ContextScopeFactory.Create())
            {
                _userRepository.Update(domainUser);

                contextScope.SaveChanges();
            }
        }

        public bool Authenticate(string emailOrlogin, string password)
        {
            var account = _accountQueryService.GetByEmailOrLogin(emailOrlogin);

            return account != null && SaltedHash.Verify(password, account.PasswordHash, account.PasswordSalt);
        }

        private Faw.Models.Domain.User GetUserInternal(Guid userId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return _userRepository.GetById(userId);
            }
        }
    }
}