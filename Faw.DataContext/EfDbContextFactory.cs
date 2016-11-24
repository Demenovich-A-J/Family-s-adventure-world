using System;
using System.Collections.Generic;
using System.Data.Entity;
using Mehdime.Entity;

namespace Faw.DataContext
{
    public class EfDbContextFactory : IDbContextFactory
    {
        public static Dictionary<Type, string> ConnectionStrings = new Dictionary<Type, string>();

        public TDbContext CreateDbContext<TDbContext>() where TDbContext : DbContext
        {
            var contextType = typeof(TDbContext);

            if (!ConnectionStrings.ContainsKey(contextType))
                throw new InvalidOperationException($"No connection string specified for context of type {contextType.Name}");

            if (contextType == typeof(FawDataContext))
                return new FawDataContext(ConnectionStrings[contextType]) as TDbContext;

            throw new NotImplementedException();
        }
    }
}