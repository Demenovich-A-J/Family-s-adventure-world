using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class FamilyService : Service, IFamilyService
    {
        public FamilyService(
            IMapper mapper, 
            IDbContextScopeFactory contextScopeFactory) 
            : base(mapper, contextScopeFactory)
        {
        }

        public void Create(Family family)
        {
            throw new System.NotImplementedException();
        }

        public void Edit(Family family)
        {
            throw new System.NotImplementedException();
        }
    }
}