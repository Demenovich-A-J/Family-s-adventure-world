using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;

namespace Faw.Web.Api.Controllers
{

    [RoutePrefix("api/FamilyMember")]
    public class FamilyMemberController : ApiController
    {
        private readonly IUserQueryService _userQueryService;
        private readonly IExpirienceQueryService _expirienceQueryService;
        private readonly IQuestQueryService _questQueryService;
        private readonly IMapper _mapper;
        private readonly IAchivmentsQueryService _achivmentsQueryService;

        public FamilyMemberController(
            IMapper mapper,
            IUserQueryService userQueryService,
            IExpirienceQueryService expirienceQueryService,
            IQuestQueryService questQueryService,
            IAchivmentsQueryService achivmentsQueryService)
        {
            _mapper = mapper;
            _userQueryService = userQueryService;
            _expirienceQueryService = expirienceQueryService;
            _questQueryService = questQueryService;
            _achivmentsQueryService = achivmentsQueryService;
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
                birthDate = user.BirthDate.ToShortDateString(),
                imageUrl = user.ImageUrl,
                description = user.Description,
                city = user.City,
                country = user.Country
            });
        }

        [HttpGet]
        [Route("FamilyUserAchivments/{userId}")]
        public IHttpActionResult FamilyUserAchivments(Guid userId)
        {
            var achivmentList = _achivmentsQueryService.GetUserAchivments(userId);

            return Ok(new
            {
                achivmentList = achivmentList.Select(x => new {
                    name = x.Name,
                    description = x.Description,
                    cretedOn = x.CreatedOn,
                    updatedOn = x.UpdatedOn,
                    imageUrl = x.ImageUrl
                })
            });
        }

        [HttpGet]
        [Route("FamilyUserQuests/{userId}")]
        public IHttpActionResult FamilyUserQuests(Guid userId)
        {
            var quests = _questQueryService.GetUserQuests(userId).OrderByDescending(x => x.CreatedOn).Take(10);

            return Ok(quests.Select(x => new
            {
                name = x.Quest.Name,
                description = x.Quest.Description,
                status = x.UserQuestStatus.ToString(),
                isPublic = x.Quest.IsPublic,
                expirience = x.Quest.Expirience,
                coins = x.Quest.Coins ?? default(decimal),
                requiredLevel = x.Quest.RequiredLevel,
                createdOn = x.CreatedOn.ToShortDateString(),
                updatedOn = x.UpdatedOn.ToShortDateString(),
                questId = x.QuestId,
                userQuestId = x.UserQuestId
            }));
        }
    }
}