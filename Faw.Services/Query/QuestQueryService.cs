using System;
using System.Collections.Generic;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class QuestQueryService : Service, IQuestQueryService
    {
        private readonly IQuestRepository _questRepository;

        public QuestQueryService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
        }

        public Quest GetById(Guid questId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<Quest>(_questRepository.GetById(questId));
            }
        }

        public IEnumerable<Quest> GetUserQuests(Guid userId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<IEnumerable<Quest>>(_questRepository.GetWhere(x => x.CreatedById == userId));
            }
        }
    }
}