using System;
using System.Collections.Generic;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class AchivmentsQueryService : Service, IAchivmentsQueryService
    {
        private readonly IAchivmentRepository _achivmentRepository;

        public AchivmentsQueryService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IAchivmentRepository achivmentRepository)
            : base(mapper, contextScopeFactory)
        {
            _achivmentRepository = achivmentRepository;
        }

        public Achivment Get(Guid achivmentId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<Achivment>(_achivmentRepository.GetById(achivmentId));
            }
        }

        public IEnumerable<Achivment> GetUserAchivments(Guid userId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Achivment> Get()
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<IEnumerable<Achivment>>(_achivmentRepository.GetWhere(null));
            }
        }
    }
}