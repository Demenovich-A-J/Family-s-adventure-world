using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
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
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<Quest>(_questRepository.GetById(questId));
            }
        }

        public IEnumerable<UserQuest> GetUserQuests(Guid userId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<IEnumerable<UserQuest>>(_userQuestRepository.GetUserQuests(userId));
            }
        }

        public UserQuest GetUserQuest(Guid userQuestId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<UserQuest>(_userQuestRepository.GetUserQuest(userQuestId));
            }
        }

        public IEnumerable<Quest> GetFamilyQuests(Guid familyId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<IEnumerable<Quest>>(_questRepository.GetWhere(x => x.FamilyId == familyId));
            }
        }

        public IEnumerable<Quest> GetAvailableFamilyUserQuests(Guid familyId, Guid userId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                var userQuestIds = _userQuestRepository.GetWhere(x => x.UserId == userId).AsNoTracking().Select(x => x.QuestId).ToList();

                return
                    Mapper.Map<IEnumerable<Quest>>(
                        _questRepository.GetWhere(x => x.FamilyId == familyId && !userQuestIds.Contains(x.EntityId)));
            }
        }

        public IEnumerable<Quest> GetQuests(Guid userId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<IEnumerable<Quest>>(_questRepository.GetWhere(x => x.CreatedById == userId));
            }
        }
    }
}