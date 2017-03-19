using System;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Faw.Services.Models.Enums;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AccountController(
            IUserService userService, 
            IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public IHttpActionResult Register(UserViewModel user)
        {
            if(user == null)
                ModelState.AddModelError("", $"{nameof(user)} can`t be null.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var token = _userService.Register(_mapper.Map<User>(user));

            return Ok(token);
        }

        // POST api/Account/Verify
        [Route("Verify")]
        public IHttpActionResult Verify(Guid token)
        {
            var verifyResult = _userService.Verify(token);

            switch (verifyResult)
            {
                case UserVerifyResult.Ok:
                    return Ok("Token already verified");
                case UserVerifyResult.TokenExpired:
                    return BadRequest("This token expired.");
                case UserVerifyResult.TokenChanged:
                    return BadRequest("Token was changed please check your mail box.");
                case UserVerifyResult.AlreadyVerified:
                    return BadRequest("Token already verified");
                default:
                    return Ok();
            }
        }

        // POST api/Account/Edit
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit(UserViewModel user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _userService.Edit(_mapper.Map<User>(user));

            return Ok();
        }

        // POST api/Account/FetchGendersInfo
        [AllowAnonymous]
        [HttpGet]
        [Route("FetchGendersInfo")]
        public IHttpActionResult FetchGendersInfo()
        {
            return Ok(new
            {
                genders = Enum.GetNames(typeof(Gender))
            });
        }
    }
}
