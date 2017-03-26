using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class UserTypeService : Service, IUserTypeService
    {
        private readonly IUserTypeRepository _userTypeRepository;

        public UserTypeService(
            IDbContextScopeFactory contextScopeFactory, 
            IUserTypeRepository userTypeRepository, 
            IMapper mapper) : base(mapper, contextScopeFactory)
        {
            _userTypeRepository = userTypeRepository;
        }


        public UserType GetByName(string name)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return
                    Mapper.Map<UserType>(
                        _userTypeRepository.GetWhere(x => x.Name.Equals(name, StringComparison.OrdinalIgnoreCase)));
            }
        }
    }
}