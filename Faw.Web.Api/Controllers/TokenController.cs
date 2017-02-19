using System;
using System.Net;
using System.Web.Http;
using Core.Infrastructure.Mvc.Jwt;
using Faw.Services.Contracts.DataManagement;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/Auth")]
    public class TokenController : ApiController
    {
        private readonly IUserService _userService;

        public TokenController(
            IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Get([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_userService.Authenticate(model.Login, model.Password))
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            return Ok(new
            {
                token = JwtManager.GenerateToken(model.Login),
                expires = DateTime.UtcNow.AddMinutes(20),
            });
        }
    }
}