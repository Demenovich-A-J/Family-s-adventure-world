using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using Faw.Models.Domain;

namespace Faw.Services.Contracts.Logic
{
    public interface IConditionExpressionBuilder
    {
        Expression<Func<T, bool>> Build<T>(IEnumerable<ExpressionProperty> expressionProperties);
        Expression<Func<T, bool>> Build<T>(ExpressionProperty expressionProperty);
    }
}