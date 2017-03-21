using System;
using System.Linq;
using System.Web.Http;
using Faw.Services.Contracts.Query;

namespace Faw.Web.Api.Controllers
{ 
    [RoutePrefix("api/Quest")]
    public class QuestController : ApiController
    {
        private readonly IQuestQueryService _questQueryService;

        public QuestController(IQuestQueryService questQueryService)
        {
            _questQueryService = questQueryService;
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
    }
}