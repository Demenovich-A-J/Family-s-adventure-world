using System;
using System.Collections;
using System.Data.Common;
using System.Data.Entity;
using System.Data.Entity.Core.Metadata.Edm;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Core.Objects.DataClasses;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using Faw.DataContext.EntityTypeConfigurations;
using Faw.Models.Domain;

namespace Faw.DataContext
{
    public class FawDataContext : DbContext
    {
        static FawDataContext()
        {
            Database.SetInitializer<FawDataContext>(null);
        }

        public FawDataContext(string nameOrConnectionString) : base(nameOrConnectionString)
        {
        }

        public FawDataContext(DbConnection existingConnection) : base(existingConnection, true)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<UserType> UserTypes { get; set; }
        public DbSet<PlayerInfo> PalyerInfos { get; set; }
        public DbSet<UserQuest> UserQuests { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            modelBuilder.Configurations.Add(new AccountEntityConfiguration());
            modelBuilder.Configurations.Add(new ClaimEntityConfiguration());
            modelBuilder.Configurations.Add(new FamilyEntityConfiguration());
            modelBuilder.Configurations.Add(new ItemEntityConfiguration());
            modelBuilder.Configurations.Add(new QuestEntityConfiguration());
            modelBuilder.Configurations.Add(new SettingEntityConfiguration());
            modelBuilder.Configurations.Add(new UserEntityConfiguration());
            modelBuilder.Configurations.Add(new UserTypeEntityConfiguration());
            modelBuilder.Configurations.Add(new PalyerInfoEntityConfiguration());
            modelBuilder.Configurations.Add(new UserQuestEntityConfiguration());
        }

        public override int SaveChanges()
        {
            ProcessDeletions();
            FillTimestsampFields();

            return base.SaveChanges();
        }

        private void ProcessDeletions()
        {
            ChangeTracker.DetectChanges();
            var changesWereMade = false;

            var dce = Configuration.AutoDetectChangesEnabled;
            Configuration.AutoDetectChangesEnabled = false;
            try
            {
                var objectContext = ((IObjectContextAdapter)this).ObjectContext;

                // remove orphans:
                // objects that were unlinked from their principal entity
                // but cannot exist without principal and were not deleted explicitly
                var entries = objectContext.ObjectStateManager
                    .GetObjectStateEntries(EntityState.Modified)
                    .Where(IsOrphaned);

                foreach (var entry in entries)
                {
                    entry.ChangeState(EntityState.Deleted);
                    changesWereMade = true;
                }

                // remove trees of deleted entries recursively
                entries = objectContext.ObjectStateManager
                    .GetObjectStateEntries(EntityState.Deleted);

                foreach (var entry in entries)
                {
                    entry.ChangeState(EntityState.Unchanged); // temporarily, to be able to load refs
                    DeleteWithRefsRecursively(entry, objectContext);
                    changesWereMade = true;
                }
            }
            finally
            {
                Configuration.AutoDetectChangesEnabled = dce;
            }

            if (changesWereMade)
            {
                ChangeTracker.DetectChanges();
            }
        }


        private void DeleteWithRefsRecursively(ObjectStateEntry entry, ObjectContext objectContext)
        {
            if (entry.State == EntityState.Deleted) return;

            var references = entry
                .RelationshipManager
                .GetAllRelatedEnds()
                .Where(re => re is IEnumerable)
                .Select(re => new { RelatedEnd = re, AssociationType = re.RelationshipSet.ElementType as AssociationType })
                .Where(x => x.AssociationType?.IsForeignKey == true)
                .ToList();

            foreach (var reference in references)
            {
                reference.RelatedEnd.Load();
                if (reference.AssociationType.Constraint.FromRole.DeleteBehavior == OperationAction.Cascade)
                {
                    foreach (var obj in ((IEnumerable)reference.RelatedEnd).Cast<object>().ToList())
                    {
                        var depEntry = objectContext.ObjectStateManager.GetObjectStateEntry(obj);
                        DeleteWithRefsRecursively(depEntry, objectContext);
                    }
                }
            }

            entry.Delete();
        }

        private bool IsOrphaned(ObjectStateEntry entry)
        {
            var refsWithNullKey = entry
                .RelationshipManager
                .GetAllRelatedEnds()
                .OfType<EntityReference>()
                .Where(er => er.EntityKey == null);

            var hasAnyNotNullableKeyProperty = refsWithNullKey
                .Select(er => er.RelationshipSet.ElementType)
                .OfType<AssociationType>()
                .Where(at => at.IsForeignKey)
                .Select(fk => fk.Constraint)
                .SelectMany(c => c.ToProperties)
                .Any(p => !p.Nullable);

            return hasAnyNotNullableKeyProperty;
        }

        private void FillTimestsampFields()
        {
            var now = DateTime.Now;

            var entriesForAudit = this.ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

            foreach (var entry in entriesForAudit)
            {
                if (entry.State == EntityState.Added)
                {
                    if (entry.CurrentValues.PropertyNames.Contains("CreatedOn"))
                        entry.CurrentValues["CreatedOn"] = now;
                }
                if (entry.CurrentValues.PropertyNames.Contains("ModifiedOn"))
                    entry.CurrentValues["ModifiedOn"] = now;
                if (entry.CurrentValues.PropertyNames.Contains("UpdatedOn"))
                    entry.CurrentValues["UpdatedOn"] = now;
            }
        }

        // Don't remove this class: 
        // it fixes issue of EntityFramework.SqlServer.dll not deployed to final project
        // by statically linking to this assembly
        //private class EfDeploymentFixer
        //{
        //    private void Fix()
        //    {
        //        System.Data.Entity.SqlServer.SqlProviderServices.Instance.ToString();
        //    }
        //}
    }
}