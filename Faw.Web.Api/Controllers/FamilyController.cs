using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [RoutePrefix("api/Family")]
    public class FamilyController : ApiController
    {
        private readonly IFamilyService _familyService;
        private readonly IFamilyQueryService _familyQueryService;
        private readonly IMapper _mapper;

        public FamilyController(
            IFamilyService familyService, 
            IMapper mapper,
            IFamilyQueryService familyQueryService)
        {
            _familyService = familyService;
            _mapper = mapper;
            _familyQueryService = familyQueryService;
        }

        // POST api/Family/Create
        [Route("Create")]
        public IHttpActionResult Create([FromBody]FamilyViewModel family)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Create(_mapper.Map<Family>(family));

            return Ok(new
            {
                name = family.Name,
                familyId = family.FamilyId
            });
        }

        // POST api/Family/Edit
        [Route("Edit")]
        public IHttpActionResult Edit([FromBody]FamilyViewModel family)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Edit(_mapper.Map<Family>(family));

            return Ok();
        }

        // POST api/Family/FetchUserFamily
        [HttpGet]
        [Route("FetchUserFamily")]
        public IHttpActionResult FetchUserFamily([FromUri]Guid userId)
        {
            if (!User.Identity.IsAuthenticated)
                return BadRequest(ModelState);

            var family = _familyQueryService.GetUserFamily(userId);

            if (family == null)
                return NotFound();

            return Ok(new
            {
                name = family.Name,
                familyMembers = family.FamilyMemebers.Select(x => new
                {
                    name = $"{x.FirstName} {x.LastName}"
                }).ToList(),
                familyId = family.FamilyId
            });
        }
    }
}