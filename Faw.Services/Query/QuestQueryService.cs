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
        private readonly IUserQuestRepository _userQuestRepository;

        public QuestQueryService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository,
            IUserQuestRepository userQuestRepository)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
            _userQuestRepository = userQuestRepository;
        }

        public Quest GetById(Guid questId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<Quest>(_questRepository.GetById(questId));
            }
        }

        public IEnumerable<UserQuest> GetUserQuests(Guid userId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<IEnumerable<UserQuest>>(_userQuestRepository.GetWhere(x => x.UserId == userId));
            }
        }

        public IEnumerable<Quest> GetQuests(Guid userId)
        {
            using (_contextScopeFactory.CreateReadOnly())
            {
                return _mapper.Map<IEnumerable<Quest>>(_questRepository.GetWhere(x => x.CreatedById == userId));
            }
        }
    }
}