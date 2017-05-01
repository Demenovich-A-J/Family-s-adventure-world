using System;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Services.Models.Enums;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class QuestService : Service, IQuestService
    {
        private readonly IQuestRepository _questRepository;
        private readonly IUserQuestRepository _userQuestRepository;
        private readonly IExpirienceQueryService _expirienceQueryService;
        private readonly IQuestQueryService _questQueryService;

        public QuestService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository,
            IUserQuestRepository userQuestRepository,
            IExpirienceQueryService expirienceQueryService,
            IQuestQueryService questQueryService)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
            _userQuestRepository = userQuestRepository;
            _expirienceQueryService = expirienceQueryService;
            _questQueryService = questQueryService;
        }

        public void Create(Quest quest)
        {
            var domainQuest = Mapper.Map<Faw.Models.Domain.Quest>(quest);

            using (var contextScope = ContextScopeFactory.Create())
            {
                domainQuest.CreatedOn = domainQuest.UpdatedOn = DateTime.UtcNow;
                domainQuest.Expirience = _expirienceQueryService.CalculateExpirience(domainQuest.RequiredLevel,
                    QuestСomplexity.Easy);

                _questRepository.Insert(domainQuest);

                contextScope.SaveChanges();
            }
        }

        public void Edit(Quest quest)
        {
            var domainQuest = GetQuestInternal(quest.QuestId);

            Mapper.Map(quest, domainQuest);

            using (var contextScope = ContextScopeFactory.Create())
            {
                domainQuest.UpdatedOn = DateTime.UtcNow;

                _questRepository.Update(domainQuest);

                contextScope.SaveChanges();
            }
        }

        public void AssignQuestUser(Guid userId, Guid questId)
        {
            var quest = _questQueryService.GetById(questId);

            var userQuest = new UserQuest
            {
                UserId = userId,
                QuestId = questId,
                UserQuestStatus = UserQuestStatus.Assigned,
                QuestСomplexity = quest.QuestСomplexity
            };

            userQuest.CreatedOn = userQuest.UpdatedOn = DateTime.UtcNow;

            using (var contextScope = ContextScopeFactory.Create())
            {
                _userQuestRepository.Insert(Mapper.Map<Faw.Models.Domain.UserQuest>(userQuest));

                contextScope.SaveChanges();
            }
        }


        private Faw.Models.Domain.Quest GetQuestInternal(Guid questId)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return _questRepository.GetById(questId);
            }
        }
    }
}