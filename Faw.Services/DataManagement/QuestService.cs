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
        private readonly IPlayerInfoService _playerInfoService;
        private readonly IMapper _mapper;

        public QuestService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository,
            IUserQuestRepository userQuestRepository,
            IExpirienceQueryService expirienceQueryService,
            IQuestQueryService questQueryService,
            IPlayerInfoService playerInfoService,
            IMapper mapper1)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
            _userQuestRepository = userQuestRepository;
            _expirienceQueryService = expirienceQueryService;
            _questQueryService = questQueryService;
            _playerInfoService = playerInfoService;
            _mapper = mapper1;
        }

        public void Create(Quest quest)
        {
            var domainQuest = Mapper.Map<Faw.Models.Domain.Quest>(quest);

            using (var contextScope = ContextScopeFactory.Create())
            {
                domainQuest.CreatedOn = domainQuest.UpdatedOn = DateTime.UtcNow;
                domainQuest.Expirience = _expirienceQueryService.CalculateExpirience(domainQuest.RequiredLevel,
                    quest.QuestСomplexity);

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
                domainQuest.Expirience = _expirienceQueryService.CalculateExpirience(domainQuest.RequiredLevel,
                    quest.QuestСomplexity);

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
                _userQuestRepository.Insert(_mapper.Map<Faw.Models.Domain.UserQuest>(userQuest));

                contextScope.SaveChanges();
            }
        }

        public void UpdateQuestStatus(Guid userQuestId, UserQuestStatus status)
        {

            Faw.Models.Domain.UserQuest userQuest;

            using (var contextScope = ContextScopeFactory.Create())
            {
                userQuest = _userQuestRepository.GetUserQuest(userQuestId);

                userQuest.UserQuestStatus = _mapper.Map<Faw.Models.Domain.Enums.UserQuestStatus>(status);
                _userQuestRepository.Save(userQuest);

                contextScope.SaveChanges();
            }

            switch (status)
            {
                case UserQuestStatus.Verified:
                    _playerInfoService.AdjustPlayerExpirience(userQuest.UserId, userQuest.Quest.Expirience);
                    break;
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