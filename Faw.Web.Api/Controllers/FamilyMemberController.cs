using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.Query;

namespace Faw.Web.Api.Controllers
{

    [RoutePrefix("api/FamilyMember")]
    public class FamilyMemberController : ApiController
    {
        private readonly IUserQueryService _userQueryService;
        private readonly IExpirienceQueryService _expirienceQueryService;
        private readonly IQuestQueryService _questQueryService;
        private readonly IMapper _mapper;

        public FamilyMemberController(
            IMapper mapper,
            IUserQueryService userQueryService,
            IExpirienceQueryService expirienceQueryService,
            IQuestQueryService questQueryService)
        {
            _mapper = mapper;
            _userQueryService = userQueryService;
            _expirienceQueryService = expirienceQueryService;
            _questQueryService = questQueryService;
        }

        [HttpGet]
        [Route("FamilyUserInfo/{userId}")]
        public IHttpActionResult FamilyUserInfo(Guid userId)
        {
            var user = _userQueryService.Get(userId);
            var nextLevel = _expirienceQueryService.GetExpirience(user.PlayerInfo.Level + 1);

            return Ok(new
            {
                userId = user.UserId,
                userName = $"{user.FirstName}  {user.LastName}",
                playerInfo = new
                {
                    level = user.PlayerInfo.Level,
                    expirienceAmount = user.PlayerInfo.ExpirienceAmount,
                    expirienceToNextLevel = nextLevel.ExpirienceAmount
                },
                gender = user.Gender.ToString(),
                birthDate = user.BirthDate
            });
        }

        [HttpGet]
        [Route("FamilyUserAchivments/{userId}")]
        public IHttpActionResult FamilyUserAchivments(Guid userId)
        {
            //TODO: add achivments to db
            return Ok(new
            {
                
            });
        }

        [HttpGet]
        [Route("FamilyUserQuests/{userId}")]
        public IHttpActionResult FamilyUserQuests(Guid userId)
        {
            var quests = _questQueryService.GetUserQuests(userId);

            return Ok(quests.Select(x => new
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
            }));
        }
    }
}