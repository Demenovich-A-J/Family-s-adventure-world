using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class FamilyService : Service, IFamilyService
    {
        private readonly IFamilyRepository _familyRepository;
        private readonly IFamilyQueryService _familyQueryService;
        private readonly IUserQueryService _userQueryService;
        private readonly IUserService _userService;
        private readonly IUserRepository _userRepository;

        public FamilyService(
            IMapper mapper, 
            IDbContextScopeFactory contextScopeFactory,
            IFamilyRepository familyRepository,
            IFamilyQueryService familyQueryService,
            IUserQueryService userQueryService,
            IUserService userService,
            IUserRepository userRepository) 
            : base(mapper, contextScopeFactory)
        {
            _familyRepository = familyRepository;
            _familyQueryService = familyQueryService;
            _userQueryService = userQueryService;
            _userService = userService;
            _userRepository = userRepository;
        }

        public void Create(Family family)
        {
            var domainFamily = Mapper.Map<Faw.Models.Domain.Family>(family);

            using (var contextScope = ContextScopeFactory.Create())
            {
                domainFamily.CreatedOn = domainFamily.UpdatedOn = DateTime.UtcNow;
                
                _familyRepository.Save(domainFamily);

                contextScope.SaveChanges();
            }
        }

        public void Edit(Family family)
        {
            var existFamily = GetFamilyInternal(family.FamilyId);

            if (existFamily == null)
                throw new ArgumentNullException(nameof(existFamily));

            Mapper.Map(family, existFamily);

            using (var contextScope = ContextScopeFactory.Create())
            {
                existFamily.UpdatedOn = DateTime.UtcNow;

                _familyRepository.Update(existFamily);

                contextScope.SaveChanges();
            }
        }

        public void AddNewFamilyMember(Guid familyId, Guid userId)
        {
            //TODO: Add check if family exists. and user havent been assigned to any family.
            using (var contextScope = ContextScopeFactory.Create())
            {
                var domainUser = _userRepository.GetById(userId);

                domainUser.FamilyId = familyId;

                _userRepository.Update(domainUser);

                contextScope.SaveChanges();
            }
        }

        private Faw.Models.Domain.Family GetFamilyInternal(Guid familyId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                var result = _familyRepository.GetById(familyId);

                result.CreatedBy = null;
                result.FamilyMemebers = null;

                return _familyRepository.GetById(familyId);
            }
        }
    }
}