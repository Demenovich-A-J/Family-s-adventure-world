using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Models;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class AchivmentsService: Service, IAchivmentsService
    {
        private readonly IAchivmentRepository _achivmentRepository;
        private readonly IExpressionPropertyRepository _expressionPropertyRepository;
        private readonly IPropertyValueRepository _propertyValueRepository;
        private readonly IMapper _mapper;

        public AchivmentsService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IAchivmentRepository achivmentRepository,
            IExpressionPropertyRepository expressionPropertyRepository,
            IPropertyValueRepository propertyValueRepository,
            IMapper mapper1)
            : base(mapper, contextScopeFactory)
        {
            _achivmentRepository = achivmentRepository;
            _expressionPropertyRepository = expressionPropertyRepository;
            _propertyValueRepository = propertyValueRepository;
            _mapper = mapper1;
        }

        public void ApplyUserAchivments(Guid userId)
        {
            throw new NotImplementedException();
        }

        public void Create(Achivment achivment)
        {
            SaveInternal(achivment);
        }

        public void Update(Achivment achivment)
        {
            SaveInternal(achivment);
        }

        private void SaveInternal(Achivment achivment)
        {
            var now = DateTime.UtcNow;

            using (var contextScope = ContextScopeFactory.Create())
            {
                var domainAchivment = _mapper.Map<Faw.Models.Domain.Achivment>(achivment);

                domainAchivment.UpdatedOn = domainAchivment.CreatedOn = now;

                _achivmentRepository.Save(domainAchivment);

                var expIds = domainAchivment.ExpressionProperties.Select(x => x.EntityId);

                var toRemove =
                    _expressionPropertyRepository.GetWhere(
                        x => !expIds.Contains(x.EntityId) && x.AchivmentId == domainAchivment.EntityId)
                        .Select(x => x.EntityId);

                _expressionPropertyRepository.DeleteRange(toRemove);

                EditAchivmentProperties(domainAchivment.ExpressionProperties, domainAchivment.EntityId);

                contextScope.SaveChanges();
            }
        }

        private void EditAchivmentProperties(IEnumerable<Faw.Models.Domain.ExpressionProperty> expressionProperties, Guid achivmentId)
        {
            using (var contextScope = ContextScopeFactory.Create())
            {
                foreach (var expressionProperty in expressionProperties.ToList())
                {
                    var expr = _expressionPropertyRepository.Get(expressionProperty.EntityId);

                    if (expr == null)
                    {
                        expressionProperty.LeftPropertyValueId = expressionProperty.LeftPropertyValue.EntityId;
                        expressionProperty.RightPropertyValueId = expressionProperty.RightPropertyValue.EntityId;
                    }
                    else
                    {
                        expressionProperty.LeftPropertyValue.EntityId = expressionProperty.LeftPropertyValueId;
                        expressionProperty.RightPropertyValue.EntityId = expressionProperty.RightPropertyValueId;
                    }

                    _expressionPropertyRepository.Save(expressionProperty);
                    UpdatePropertyValue(expressionProperty.LeftPropertyValue);
                    UpdatePropertyValue(expressionProperty.RightPropertyValue);
                }

                contextScope.SaveChanges();
            }
        }

        private void UpdatePropertyValue(Faw.Models.Domain.PropertyValue propertyValue)
        {
            using (var contextScope = ContextScopeFactory.Create())
            {
                var domainPropertyValue = _propertyValueRepository.GetById(propertyValue.EntityId);

                if (domainPropertyValue != null)
                {
                    _mapper.Map(propertyValue, domainPropertyValue);
                }

                _propertyValueRepository.Save(propertyValue);

                contextScope.SaveChanges();
            }
        }
    }
}