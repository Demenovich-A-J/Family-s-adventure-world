using System;
using AutoMapper;
using Core.Infrastructure;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts;
using Faw.Services.Models;

namespace Faw.Services.DataAccess
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserTypeRepository _userTypeRepository;
        private readonly IAccountRepository _accountRepository;

        public UserService(
            IUserRepository userRepository, 
            IMapper mapper, 
            IUserTypeRepository userTypeRepository, 
            IAccountRepository accountRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userTypeRepository = userTypeRepository;
            _accountRepository = accountRepository;
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

            var userType = _userTypeRepository.GetByName(user.Account.UserType);

            if (userType == null)
                throw new ArgumentNullException("userType");

            domainUser.UserTypeId = userType.EntityId;
            domainUser.AccountId = domainUser.Account.EntityId;

            _accountRepository.Insert(domainUser.Account);
            _userRepository.Insert(domainUser);
        }

        public User GetUserById(Guid userId)
        {
            return _mapper.Map<User>(_userRepository.GetById(userId));
        }
    }
}