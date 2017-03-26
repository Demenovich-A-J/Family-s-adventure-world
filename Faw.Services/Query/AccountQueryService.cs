using System;
using System.Linq;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
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
            using (ContextScopeFactory.CreateReadOnly())
            {
                return
                    Mapper.Map<Account>(
                        _accountRepository.GetWhere(
                            x =>
                                x.Token == token));
            }
        }

        public Account GetByEmailOrLogin(string emailOrlogin)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return
                    Mapper.Map<Account>(
                        _accountRepository.GetWhere(
                            x =>
                                x.Email.Equals(emailOrlogin, StringComparison.OrdinalIgnoreCase) ||
                                x.Login.Equals(emailOrlogin, StringComparison.OrdinalIgnoreCase)).SingleOrDefault());
            }
        }
    }
}