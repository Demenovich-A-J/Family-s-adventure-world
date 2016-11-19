using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Core.DataContext.Contracts;
using Core.DataContext.EF;
using Faw.Models.Domain;

namespace Faw.DataContext
{
    public class FawDataContextWrapper : DataContextWrapper
    {
        public FawDataContextWrapper(string connectionString, DbCompiledModel compiledModel) : base(connectionString, compiledModel)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Claim> Claims { get; set; }
        public DbSet<Family> Families { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<UserType> UserTypes { get; set; }

        public override IUnitOfWork CreateUnitOfWork()
        {
            return new FawUnitOfWork(CreateDbContext());
        }
    }
}
