using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class FamilyQueryService : Service, IFamilyQueryService
    {
        private readonly IFamilyRepository _familyRepository;

        public FamilyQueryService(
            IMapper mapper, 
            IDbContextScopeFactory contextScopeFactory,
            IFamilyRepository familyRepository) 
            : base(mapper, contextScopeFactory)
        {
            _familyRepository = familyRepository;
        }


        public Family Get(Guid familyId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<Family>(_familyRepository.GetById(familyId));
            }
        }
    }
}