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

        public FamilyService(
            IMapper mapper, 
            IDbContextScopeFactory contextScopeFactory,
            IFamilyRepository familyRepository,
            IFamilyQueryService familyQueryService,
            IUserQueryService userQueryService,
            IUserService userService) 
            : base(mapper, contextScopeFactory)
        {
            _familyRepository = familyRepository;
            _familyQueryService = familyQueryService;
            _userQueryService = userQueryService;
            _userService = userService;
        }

        public void Create(Family family)
        {
            var domainFamily = _mapper.Map<Faw.Models.Domain.Family>(family);

            using (var contextScope = _contextScopeFactory.Create())
            {
                domainFamily.CreatedOn = domainFamily.UpdatedOn = DateTime.UtcNow;
                
                _familyRepository.Insert(domainFamily);

                contextScope.SaveChanges();
            }
        }

        public void Edit(Family family)
        {
            var existFamily = _familyQueryService.Get(family.FamilyId);

            if (existFamily == null)
                throw new ArgumentNullException(nameof(existFamily));

            _mapper.Map(family, existFamily);

            using (var contextScope = _contextScopeFactory.Create())
            {
                existFamily.UpdatedOn = DateTime.UtcNow;

                _familyRepository.Update(_mapper.Map<Faw.Models.Domain.Family>(existFamily));

                contextScope.SaveChanges();
            }
        }

        public void AddNewFamilyMember(Guid familyId, Guid userId)
        {
            var user = _userQueryService.GetUserById(userId);

            //TODO: Add check if family exists. and user havent been assigned to any family.
            user.FamilyId = familyId;

            _userService.Edit(user);
        }
    }
}