using System;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Web.Api.Models;

namespace Faw.Web.Api.Controllers
{
    [RoutePrefix("api/Achivment")]
    public class AchivmentController : ApiController
    {
        private readonly IAchivmentsService _achivmentsService;
        private readonly IAchivmentsQueryService _achivmentsQueryService;
        private readonly IMapper _mapper;

        public AchivmentController(
            IAchivmentsService achivmentsService,
            IMapper mapper,
            IAchivmentsQueryService achivmentsQueryService)
        {
            _achivmentsService = achivmentsService;
            _mapper = mapper;
            _achivmentsQueryService = achivmentsQueryService;
        }

        [HttpGet]
        [Route("Get")]
        public IHttpActionResult Get()
        {
            var achivments = _achivmentsQueryService.Get();

            return Ok(achivments.Select(x => new
            {
                achivmentId = x.AchivmentId,
                name = x.Name,
                description = x.Description,
                imageUrl = x.ImageUrl,
                expression = x.Expression,
                enabled = x.Enabled,
                updatedOn = x.UpdatedOn,
                createdOn = x.CreatedOn
            }));
        }

        [HttpGet]
        [Route("Get/{achivmentId}")]
        public IHttpActionResult Get(Guid achivmentId)
        {
            var achivment = _achivmentsQueryService.Get(achivmentId);

            return Ok(new
            {
                achivmentId = achivment.AchivmentId,
                name = achivment.Name,
                description = achivment.Description,
                imageUrl = achivment.ImageUrl,
                expression = achivment.Expression,
                enabled = achivment.Enabled,
                updatedOn = achivment.UpdatedOn,
                createdOn = achivment.CreatedOn,
                expressionProperties = achivment.ExpressionProperties.Select(x => new
                {
                    expressionPropertyId = x.ExpressionPropertyId,
                    achivmentId = x.AchivmentId,
                    leftPropertyValueId = x.LeftPropertyValueId,
                    rightPropertyValueId = x.RightPropertyValueId,
                    modelName = x.ModelName,
                    order = x.Order,
                    comparer = x.Comparer.ToString(),
                    connector = x.Connector.ToString(),
                    leftPropertyValue = new
                    {
                        propertyName = x.LeftPropertyValue.PropertyName,
                        value = x.LeftPropertyValue.Value,
                        valueType = x.LeftPropertyValue.ValueType.ToString(),

                    },
                    rightPropertyValue = new
                    {
                        propertyName = x.RightPropertyValue.PropertyName,
                        value = x.RightPropertyValue.Value,
                        valueType = x.RightPropertyValue.ValueType.ToString(),

                    }
                })
            });

        }

        [HttpPut]
        [Route("Create")]
        public IHttpActionResult Create([FromBody] AchivmentViewModel achivment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _achivmentsService.Create(_mapper.Map<Achivment>(achivment));

            return Ok();
        }

        [HttpPost]
        [Route("Update")]
        public IHttpActionResult Update([FromBody] Achivment achivment)
        {
            _achivmentsService.Update(achivment);

            return Ok();
        }
    }
}