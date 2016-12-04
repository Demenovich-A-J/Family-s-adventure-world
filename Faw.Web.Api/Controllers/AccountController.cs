using System;
using System.Net.Http;
using System.Security.Cryptography;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Faw.Web.Api.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace Faw.Web.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AccountController(
            ISecureDataFormat<AuthenticationTicket> accessTokenFormat, 
            IUserService userService, 
            IMapper mapper)
        {
            AccessTokenFormat = accessTokenFormat;
            _userService = userService;
            _mapper = mapper;
        }

        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

        // POST api/Account/Register
        [Route("Register")]
        public IHttpActionResult Register(UserViewModel user)
        {
            if (ModelState.IsValid)
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
        [Route("Edit")]
        public IHttpActionResult Edit(UserViewModel user)
        {
            if (ModelState.IsValid)
                return BadRequest(ModelState);

            _userService.Edit(_mapper.Map<User>(user));

            return Ok();
        }

        #region Helpers

        private IAuthenticationManager Authentication
        {
            get { return Request.GetOwinContext().Authentication; }
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        private class ExternalLoginData
        {
            private string LoginProvider { get; set; }
            private string ProviderKey { get; set; }
            private string UserName { get; set; }

            //public IList<Claim> GetClaims()
            //{
            //    IList<Claim> claims = new List<Claim>();
            //    claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

            //    if (UserName != null)
            //    {
            //        claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
            //    }

            //    return claims;
            //}

            //public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
            //{
            //    if (identity == null)
            //    {
            //        return null;
            //    }

            //    Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

            //    if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
            //        || String.IsNullOrEmpty(providerKeyClaim.Value))
            //    {
            //        return null;
            //    }

            //    if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
            //    {
            //        return null;
            //    }

            //    return new ExternalLoginData
            //    {
            //        LoginProvider = providerKeyClaim.Issuer,
            //        ProviderKey = providerKeyClaim.Value,
            //        UserName = identity.FindFirstValue(ClaimTypes.Name)
            //    };
            //}
        }

        private static class RandomOAuthStateGenerator
        {
            private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

            public static string Generate(int strengthInBits)
            {
                const int bitsPerByte = 8;

                if (strengthInBits%bitsPerByte != 0)
                {
                    throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
                }

                int strengthInBytes = strengthInBits/bitsPerByte;

                byte[] data = new byte[strengthInBytes];
                _random.GetBytes(data);
                return HttpServerUtility.UrlTokenEncode(data);
            }
        }

        #endregion
    }
}
