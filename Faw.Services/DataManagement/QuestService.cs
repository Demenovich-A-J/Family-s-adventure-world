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
        private readonly IQuestQueryService _questQueryService;

        public QuestService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IQuestRepository questRepository,
            IQuestQueryService questQueryService,
            IUserQuestRepository userQuestRepository)
            : base(mapper, contextScopeFactory)
        {
            _questRepository = questRepository;
            _questQueryService = questQueryService;
            _userQuestRepository = userQuestRepository;
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
            var domainQuest = _mapper.Map<Faw.Models.Domain.Quest>(_questQueryService.GetById(quest.QuestId));

            _mapper.Map(quest, domainQuest);

            using (var contextScope = _contextScopeFactory.Create())
            {
                domainQuest.UpdatedOn = DateTime.UtcNow;

                _questRepository.Update(domainQuest);

                contextScope.SaveChanges();
            }
        }

        public void AssignQuestUser(Guid userId, Guid questId)
        {
            var userQuest = new UserQuest
            {
                UserId = userId,
                QuestId = questId,
                UserQuestStatus = UserQuestStatus.Assigned,
            };

            userQuest.CreatedOn = userQuest.UpdatedOn = DateTime.UtcNow;

            using (var contextScope = _contextScopeFactory.Create())
            {
                _userQuestRepository.Insert(_mapper.Map<Faw.Models.Domain.UserQuest>(userQuest));

                contextScope.SaveChanges();
            }
        }
    }
}