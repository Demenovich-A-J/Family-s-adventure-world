using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class AchivmentsService: Service, IAchivmentsService
    {
        private readonly IAchivmentRepository _achivmentRepository;

        public AchivmentsService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IAchivmentRepository achivmentRepository)
            : base(mapper, contextScopeFactory)
        {
            _achivmentRepository = achivmentRepository;
        }

        public void ApplyUserAchivments(Guid userId)
        {
            throw new NotImplementedException();
        }

        public void Create(Achivment achivment)
        {
            SaveInternal(achivment);
        }

        public void Update(Achivment achivment)
        {
            SaveInternal(achivment);
        }

        private void SaveInternal(Achivment achivment)
        {
            var now = DateTime.UtcNow;

            using (var contextScope = ContextScopeFactory.Create())
            {
                Faw.Models.Domain.Achivment domainAchivment;

                if (achivment.AchivmentId != Guid.Empty)
                {
                    domainAchivment = GetAchivmentInternal(achivment.AchivmentId);

                    Mapper.Map(achivment, domainAchivment);
                    domainAchivment.UpdatedOn = now;
                    _achivmentRepository.Update(domainAchivment);

                }
                else
                {
                    domainAchivment = Mapper.Map<Faw.Models.Domain.Achivment>(achivment);

                    domainAchivment.UpdatedOn = domainAchivment.CreatedOn = now;

                    _achivmentRepository.Insert(domainAchivment);
                }

                contextScope.SaveChanges();
            }
        }

        private Faw.Models.Domain.Achivment GetAchivmentInternal(Guid questId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return _achivmentRepository.GetById(questId);
            }
        }
    }
}