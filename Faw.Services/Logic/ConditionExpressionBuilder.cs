using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Faw.Models.Domain;
using Faw.Models.Domain.Enums;
using Faw.Services.Contracts.Logic;

namespace Faw.Services.Logic
{
    public class ConditionExpressionBuilder : IConditionExpressionBuilder
    {
        public Expression<Func<T, bool>> Build<T>(IEnumerable<ExpressionProperty> expressionProperties)
        {
            if (expressionProperties.All(x => x.ModelName != typeof(T).Name))
                throw new InvalidCastException(
                    $"All expression property should have same type and be equeal to {typeof(T).Name} type");

            var firstExpression = expressionProperties.OrderByDescending(x => x.Order).First();

            var expression = GetPropertyExpression<T>(firstExpression);

            if(expressionProperties.Count() == 1)
                return Expression.Lambda<Func<T, bool>>(expression);

            foreach (var expressionProperty in expressionProperties)
            {
                var currentExpression = GetPropertyExpression<T>(expressionProperty);

                switch (expressionProperty.Connector)
                {
                    case Connector.Or:
                        expression = Expression.OrElse(expression, currentExpression);
                        break;
                    case Connector.And:
                        expression = Expression.AndAlso(expression, currentExpression);
                        break;
                }
            }

            return Expression.Lambda<Func<T, bool>>(expression);
        }

        public Expression<Func<T, bool>> Build<T>(ExpressionProperty expressionProperty)
        {
            return Expression.Lambda<Func<T, bool>>(GetPropertyExpression<T>(expressionProperty));
        }

        private Expression GetPropertyExpression<T>(ExpressionProperty expressionProperty)
        {
            var typeParam = Expression.Parameter(typeof(T));

            var leftExpression = GetPropertyValueExpression(expressionProperty.LeftPropertyValue, typeParam);
            var righExpression = GetPropertyValueExpression(expressionProperty.RightPropertyValue, typeParam);

            Expression currentExpression;

            switch (expressionProperty.Comparer)
            {
                case Comparer.Less:
                    currentExpression = Expression.LessThan(leftExpression, righExpression);
                    break;
                case Comparer.Equal:
                    currentExpression = Expression.Equal(leftExpression, righExpression);
                    break;
                case Comparer.Greater:
                    currentExpression = Expression.GreaterThan(leftExpression, righExpression);
                    break;
                case Comparer.LessOrEqual:
                    currentExpression = Expression.LessThanOrEqual(leftExpression, righExpression);
                    break;
                case Comparer.GreaterOrEqual:
                    currentExpression = Expression.GreaterThanOrEqual(leftExpression, righExpression);
                    break;
                default:
                    currentExpression = Expression.Equal(leftExpression, righExpression);
                    break;
            }

            return currentExpression;
        }

        private Expression GetPropertyValueExpression(PropertyValue propertyValue, Expression parameterExpression)
        {
            if (string.IsNullOrEmpty(propertyValue.PropertyName))
            {
                return Expression.Constant(propertyValue.Value);
            }

            return Expression.Property(parameterExpression, propertyValue.PropertyName);
        }
    }
}