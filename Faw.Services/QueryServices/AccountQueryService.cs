using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.QueryContracts;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.QueryServices
{
    public class AccountQueryService : Service, IAccountQueryService
    {
        private readonly IAccountRepository _accountRepository;

        public AccountQueryService(
            IDbContextScopeFactory contextScopeFactory,
            IMapper mapper, 
            IAccountRepository accountRepository) : base(mapper, contextScopeFactory)
        {
            _accountRepository = accountRepository;
        }
        public Account GetByToken(Guid token)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return
                    _mapper.Map<Account>(
                        _accountRepository.GetWhere(
                            x =>
                                x.Token == token));
            }
        }

        public Account GetByEmailOrLogin(string emailOrlogin)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return
                    _mapper.Map<Account>(
                        _accountRepository.GetWhere(
                            x =>
                                x.Email.Equals(emailOrlogin, StringComparison.OrdinalIgnoreCase) ||
                                x.UserName.Equals(emailOrlogin, StringComparison.OrdinalIgnoreCase)));
            }
        }
    }
}