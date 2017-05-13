using System;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Web.Api.Models;
using Faw.Web.Api.Models.Helper;
using Faw.Web.Api.Models.Quest;

namespace Faw.Web.Api.Controllers
{ 
    [RoutePrefix("api/Quest")]
    public class QuestController : ApiController
    {
        private readonly IQuestQueryService _questQueryService;
        private readonly IQuestService _questService;
        private readonly IMapper _mapper;

        public QuestController(
            IQuestQueryService questQueryService,
            IQuestService questService,
            IMapper mapper)
        {
            _questQueryService = questQueryService;
            _questService = questService;
            _mapper = mapper;
        }

        [HttpPut]
        [Route("Create")]
        public IHttpActionResult Create([FromBody] QuestViewModel quest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _questService.Create(_mapper.Map<Quest>(quest));

            return Ok();
        }

        [HttpPost]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] Quest quest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _questService.Edit(quest);

            return Ok();
        }

        [HttpPost]
        [Route("UpdateQuestStatus")]
        public IHttpActionResult UpdateQuestStatus([FromBody] UpdateQuestStatusViewModel updateQuestStatusViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _questService.UpdateQuestStatus(updateQuestStatusViewModel.UserQuestId, updateQuestStatusViewModel.Status);

            return Ok();
        }

        [HttpPut]
        [Route("AssignUserQuest")]
        public IHttpActionResult AssignUserQuest([FromBody] AssignUserQuestViewModel assignUserQuestViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _questService.AssignQuestUser(assignUserQuestViewModel.UserId, assignUserQuestViewModel.QuestId);

            return Ok();
        }

        [HttpGet]
        [Route("FetchQuest/{questId}")]
        public IHttpActionResult FetchQuest([FromUri] Guid questId)
        {
            var quest = _questQueryService.GetById(questId);
            return Ok(new
            {
                questId = quest.QuestId,
                name = quest.Name ?? string.Empty,
                description = quest.Description ?? string.Empty,
                isPublic = quest.IsPublic,
                expirience = quest.Expirience,
                coins = quest.Coins ?? default(decimal),
                requiredLevel = quest.RequiredLevel,
                createdOn = quest.CreatedOn,
                updatedOn = quest.UpdatedOn,
                imageUrl = quest.ImageUrl ?? string.Empty,
                createdById = quest.CreatedById,
                questСomplexity = quest.QuestСomplexity.ToString()
            });
        }

        [HttpGet]
        [Route("FetchUserQuest/{userQuestId}")]
        public IHttpActionResult FetchUserQuest([FromUri] Guid userQuestId)
        {
            var userQuest = _questQueryService.GetUserQuest(userQuestId);

            return Ok(new
            {
                questId = userQuest.QuestId,
                name = userQuest.Quest.Name,
                description = userQuest.Quest.Description,
                isPublic = userQuest.Quest.IsPublic,
                expirience = userQuest.Quest.Expirience,
                coins = userQuest.Quest.Coins ?? default(decimal),
                requiredLevel = userQuest.Quest.RequiredLevel,
                createdOn = userQuest.CreatedOn,
                updatedOn = userQuest.UpdatedOn,
                status = userQuest.UserQuestStatus.ToString(),
                userQuestId = userQuest.UserQuestId,
                imageUrl = userQuest.Quest.ImageUrl,
                createdById = userQuest.Quest.CreatedById,
                questСomplexity = userQuest.Quest.QuestСomplexity.ToString(),
                assignedOnId = userQuest.UserId
            });
        }


        [HttpGet]
        [Route("FetchUserQuests/{userId}")]
        public IHttpActionResult FetchUserQuests([FromUri] Guid userId)
        {
            var quests = _questQueryService.GetUserQuests(userId);

            return Ok(new
            {
                quests = quests.Select(x => new
                {
                    name = x.Quest.Name,
                    description = x.Quest.Description,
                    status = x.UserQuestStatus.ToString(),
                    isPublic = x.Quest.IsPublic,
                    expirience = x.Quest.Expirience,
                    coins = x.Quest.Coins ?? default(decimal),
                    requiredLevel = x.Quest.RequiredLevel,
                    createdOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn,
                    questId = x.QuestId,
                    userQuestId = x.UserQuestId,
                    imageUrl = x.Quest.ImageUrl,
                    createdById = x.Quest.CreatedById,
                    questСomplexity = x.Quest.QuestСomplexity.ToString(),
                    assignedOnId = x.UserId
                })
            });
        }

        [HttpGet]
        [Route("FetchQuests/{userId}")]
        public IHttpActionResult FetchQuests([FromUri] Guid userId)
        {
            var quests = _questQueryService.GetQuests(userId);

            return Ok(new
            {
                quests = quests.Select(x => new
                {
                    name = x.Name,
                    description = x.Description,
                    isPublic = x.IsPublic,
                    expirience = x.Expirience,
                    coins = x.Coins ?? default(decimal),
                    requiredLevel = x.RequiredLevel,
                    createdOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn,
                    questId = x.QuestId,
                    imageUrl = x.ImageUrl,
                    createdById = x.CreatedById,
                    questСomplexity = x.QuestСomplexity.ToString()
                })
            });
        }

        [HttpGet]
        [Route("FetchFamilyQuests/{familyId}")]
        public IHttpActionResult FetchFamilyQuests([FromUri] Guid familyId)
        {
            var quests = _questQueryService.GetFamilyQuests(familyId);

            return Ok(new
            {
                quests = quests.Select(x => new
                {
                    name = x.Name,
                    description = x.Description,
                    isPublic = x.IsPublic,
                    expirience = x.Expirience,
                    coins = x.Coins ?? default(decimal),
                    requiredLevel = x.RequiredLevel,
                    createdOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn,
                    questId = x.QuestId,
                    imageUrl = x.ImageUrl,
                    questСomplexity = x.QuestСomplexity.ToString()
                })
            });
        }

        [HttpGet]
        [Route("UserAvailableQuests/{familyId}/{userId}")]
        public IHttpActionResult FetchFamilyQuests([FromUri] Guid familyId, [FromUri] Guid userId)
        {
            var quests = _questQueryService.GetAvailableFamilyUserQuests(familyId, userId);

            return Ok(new
            {
                quests = quests.Select(x => new
                {
                    questId = x.QuestId,
                    name = x.Name,
                    description = x.Description,
                    isPublic = x.IsPublic,
                    expirience = x.Expirience,
                    coins = x.Coins ?? default(decimal),
                    requiredLevel = x.RequiredLevel,
                    createdOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn,
                    imageUrl = x.ImageUrl,
                    createdById = x.CreatedById,
                    questСomplexity = x.QuestСomplexity.ToString()
                })
            });
        }
    }
}