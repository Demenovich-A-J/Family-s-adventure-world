using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
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
            //TODO: take achivments from db

            var achivmentList = new List<Achivment>
            {
                new Achivment
                {
                    Name = "Complete 10 quests",
                    Description =
                        "Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий. Значимость этих проблем настолько очевидна, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации.",
                    CreatedOn = DateTime.Now.AddDays(-2),
                    UpdatedOn = DateTime.Now.AddDays(2),
                    ImageUrl = "https://cdn.pixabay.com/photo/2012/04/01/17/52/eye-23753_960_720.png"
                },
                new Achivment
                {
                    Name = "Complete 20 quests",
                    Description =
                        "Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий. Значимость этих проблем настолько очевидна, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации.",
                    CreatedOn = DateTime.Now.AddDays(-2),
                    UpdatedOn = DateTime.Now.AddDays(2),
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/03/28/12/35/cat-1285634_960_720.png"
                },
                new Achivment
                {
                    Name = "Complete 30 quests",
                    Description =
                        "Не следует, однако забывать, что постоянный количественный рост и сфера нашей активности влечет за собой процесс внедрения и модернизации существенных финансовых и административных условий. Значимость этих проблем настолько очевидна, что сложившаяся структура организации влечет за собой процесс внедрения и модернизации систем массового участия. Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации.",
                    CreatedOn = DateTime.Now.AddDays(-2),
                    UpdatedOn = DateTime.Now.AddDays(2),
                    ImageUrl = "https://cdn.pixabay.com/photo/2017/04/09/22/54/lion-2217152_960_720.jpg"
                }
            };

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
                questId = x.QuestId
            }));
        }
    }
}