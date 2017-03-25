using System;
using System.Linq;
using System.Web.Http;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Web.Api.Models.Quest;

namespace Faw.Web.Api.Controllers
{ 
    [RoutePrefix("api/Quest")]
    public class QuestController : ApiController
    {
        private readonly IQuestQueryService _questQueryService;
        private readonly IQuestService _questService;

        public QuestController(
            IQuestQueryService questQueryService,
            IQuestService questService)
        {
            _questQueryService = questQueryService;
            _questService = questService;
        }

        [HttpPut]
        [Route("Create")]
        public IHttpActionResult Create([FromBody] Quest quest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _questService.Create(quest);

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
                    status = x.UserQuestStatus,
                    isPublic = x.Quest.IsPublic,
                    expirience = x.Quest.Expirience,
                    coins = x.Quest.Coins ?? default(decimal),
                    requiredLevel = x.Quest.RequiredLevel,
                    createdOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn
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
                    updatedOn = x.UpdatedOn
                })
            });
        }

        [HttpGet]
        [Route("FetchFamilyQuests/{userId}/{familyId}")]
        public IHttpActionResult FetchFamilyQuests([FromUri] Guid userId, [FromUri] Guid familyId)
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
                    updatedOn = x.UpdatedOn
                })
            });
        }
    }
}