using System.Linq;

namespace Core.DataContext.Contracts
{
    public interface IQuerySource
    {
        IQueryable<T> Query<T>() where T : class;
    }
}
