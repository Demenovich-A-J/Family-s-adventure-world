using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Web.Api.Models;
using Faw.Web.Api.Models.Helper;

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

        // Put api/Family/Create
        [HttpPut]
        [Route("Create")]
        public IHttpActionResult Create([FromBody]FamilyViewModel family)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Create(_mapper.Map<Family>(family));

            return Ok(new
            {
                name = family.Name,
                familyId = family.FamilyId,
                description = family.Description,
                goal = family.Goal
            });
        }

        // POST api/Family/Edit
        [HttpPost]
        [Route("Edit")]
        public IHttpActionResult Edit([FromBody]FamilyViewModel family)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Edit(_mapper.Map<Family>(family));

            return Ok();
        }

        // GET api/Family/FetchUserFamily
        [HttpGet]
        [Route("FetchUserFamily/{userId}")]
        public IHttpActionResult FetchUserFamily([FromUri]Guid userId)
        {
            var family = _familyQueryService.GetUserFamily(userId);

            if (family == null)
                return NotFound();

            return Ok(new
            {
                name = family.Name,
                familyMembers = family.FamilyMemebers.Where(x => x.UserId != userId).Select(x => new
                {
                    name = $"{x.FirstName} {x.LastName}",
                    birthDate = x.BirthDate.ToShortDateString(),
                    gender = x.Gender.ToString(),
                    description = x.Description,
                    imageUrl = x.ImageUrl,
                    id = x.UserId
                }).ToList(),
                familyId = family.FamilyId,
                description = family.Description,
                goal = family.Goal,
                createdById = family.CreatedById
            });
        }

        [HttpPut]
        [Route("AddFamilyMember")]
        public IHttpActionResult AddFamilyMember([FromBody] AddFamilyMember model)
        {
            _familyService.AddNewFamilyMember(model.FamilyId, model.UserId);

            return Ok();
        }
    }
}