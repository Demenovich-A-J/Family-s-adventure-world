using System;
using Faw.Models.Domain;

namespace Faw.Repositories.Contracts
{
    public interface IExpressionPropertyRepository : IRepository<ExpressionProperty>
    {
        ExpressionProperty Get(Guid id);
    }
}