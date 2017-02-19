using System.Net;
using System.Web.Http;
using Core.Infrastructure.Mvc.Jwt;
using Faw.Services.Contracts.DataManagement;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [RoutePrefix("api/Auth")]
    public class TokenController : ApiController
    {
        private readonly IUserService _userService;

        public TokenController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Get([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (_userService.Authenticate(model.Login, model.Password))
            {
                return Ok(new { token = JwtManager.GenerateToken(model.Login) });
            }

            throw new HttpResponseException(HttpStatusCode.Unauthorized);
        }
    }
}