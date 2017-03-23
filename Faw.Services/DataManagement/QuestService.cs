using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class QuestService : Service, IQuestService
    {
        private readonly IQuestRepository _questRepository;

        public QuestService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
        }

        public void Create(Quest quest)
        {
            var domainQuest = _mapper.Map<Faw.Models.Domain.Quest>(quest);

            using (var contextScope = _contextScopeFactory.Create())
            {
                domainQuest.CreatedOn = domainQuest.UpdatedOn = DateTime.UtcNow;

                _questRepository.Insert(domainQuest);

                contextScope.SaveChanges();
            }
        }

        public void Edit(Quest quest)
        {
            throw new NotImplementedException();
        }
        
    }
}