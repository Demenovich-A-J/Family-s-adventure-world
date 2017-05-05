using System;
using System.Linq;
using System.Web.Http;
using Faw.Services.Contracts.Query;

namespace Faw.Web.Api.Controllers
{
    [RoutePrefix("api/User")]
    public class UserController : ApiController
    {
        private readonly IUserQueryService _userQueryService;
        private readonly IExpirienceQueryService _expirienceQueryService;

        public UserController(
            IUserQueryService userQueryService,
            IExpirienceQueryService expirienceQueryService)
        {
            _userQueryService = userQueryService;
            _expirienceQueryService = expirienceQueryService;
        }

        // Get api/User/Search
        [HttpGet]
        [Route("SearchUsersForFamily/{text}")]
        public IHttpActionResult SearchUsersForFamily([FromUri]string text)
        {
            var result = _userQueryService.Find(text);

            return Ok(
                result.Select(x => new
                {
                    userId = x.UserId,
                    name = $"{x.FirstName} {x.LastName}",
                    email = x.Account.Email
                }));
        }


        // Get api/User/FetchUserInfo
        [HttpGet]
        [Route("FetchUserInfo")]
        public IHttpActionResult FetchUserInfo()
        {
            var user = _userQueryService.Get(RequestContext.Principal.Identity.Name);

            return Ok(new
            {
                userId = user.UserId,
                userName = $"{user.FirstName}  {user.LastName}",
                role = user.UserType.Name,
                claims = user.UserType.Claims,
                playerInfo = user.PlayerInfo,
                family = user.Family != null
                    ? new
                    {
                        name = user.Family.Name,
                        id = user.Family.FamilyId
                    }
                    : null,
                gender = user.Gender.ToString(),
                birthDate = user.BirthDate,
                imageUrl = user.ImageUrl,
                description = user.Description,
                city = user.City,
                country = user.Country
            });
        }

        [HttpGet]
        [Route("GetUser/{userId}")]
        public IHttpActionResult GetUser(Guid userId)
        {
            var user = _userQueryService.Get(userId);
            var nextLevel = _expirienceQueryService.GetExpirience(user.PlayerInfo.Level + 1);

            return Ok(new
            {
                userId = user.UserId,
                userName = $"{user.FirstName}  {user.LastName}",
                role = user.UserType.Name,
                claims = user.UserType.Claims.Select(x => new
                {
                    name = x.Name,
                    description = x.Description
                }),
                playerInfo = new
                {
                    level = user.PlayerInfo.Level,
                    exp = user.PlayerInfo.ExpirienceAmount,
                    expForNext = nextLevel.ExpirienceAmount
                },
                family = user.Family != null
                    ? new
                    {
                        name = user.Family.Name,
                        id = user.Family.FamilyId
                    } : null,
                gender = user.Gender.ToString(),
                birthDate = user.BirthDate.ToShortDateString(),
                imageUrl = user.ImageUrl,
                description = user.Description,
                city = user.City,
                country = user.Country
            });
        }
    }
}