using System;
using System.Data.Entity;
using System.Linq;
using DataContext.EF;

namespace Faw.DataContext
{
    public class FawUnitOfWork : UnitOfWork
    {
        public FawUnitOfWork(DbContext dbContext) : base(dbContext)
        {
        }

        protected override void OnBeforeSaveChanges()
        {
            var now = DateTime.Now;
            var addedEntries = DbContext.ChangeTracker.Entries().Where(e => e.State == EntityState.Added);
            foreach (var entry in addedEntries.Where(e => e.CurrentValues.PropertyNames.Contains("CreatedOn")))
            {
                entry.CurrentValues["CreatedOn"] = now;
            }

            var modifiedEntries = DbContext.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);
            foreach (var entry in modifiedEntries.Where(e => e.CurrentValues.PropertyNames.Contains("ModifiedOn")))
            {
                entry.CurrentValues["ModifiedOn"] = now;
            }
        }
    }
}