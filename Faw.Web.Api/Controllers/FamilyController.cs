using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [Authorize]
    [RoutePrefix("api/Family")]
    public class FamilyController : ApiController
    {
        private readonly IFamilyService _familyService;
        private readonly IMapper _mapper;

        public FamilyController(
            IFamilyService familyService, 
            IMapper mapper)
        {
            _familyService = familyService;
            _mapper = mapper;
        }

        // POST api/Family/Create
        [Route("Create")]
        public IHttpActionResult Create(FamilyViewModel family)
        {
            if (ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Create(_mapper.Map<Family>(family));

            return Ok();
        }

        // POST api/Family/Edit
        [Route("Edit")]
        public IHttpActionResult Edit(FamilyViewModel family)
        {
            if (ModelState.IsValid)
                return BadRequest(ModelState);

            _familyService.Edit(_mapper.Map<Family>(family));

            return Ok();
        }
    }
}