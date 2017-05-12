using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text.RegularExpressions;
using Faw.DataContext;
using Faw.Models.Domain;
using Mehdime.Entity;

namespace Faw.Repositories.Extensions
{
    public static class DbContextExtensions
    {
        public static T GetOrThrow<T>(this IAmbientDbContextLocator locator) where T : DbContext
        {
            var result = locator.Get<T>();
            if (result == null)
                throw new InvalidOperationException($"Ambient {typeof(T).Name} is expected at this point");
            return result;
        }

        public static T InsertOrUpdate<T>(this FawDataContext context, T entity) where T : BaseEntity, new()
        {
            return context.InsertOrUpdate(entity, entity.EntityId);
        }

        public static T InsertOrUpdate<T>(this FawDataContext context, T entity, object key) where T : class, new()
        {
            var dbSet = context.Set<T>();
            var dbEntity = dbSet.Find(key);
            if (dbEntity == null)
            {
                dbEntity = dbSet.Create();
                dbSet.Add(dbEntity);
            }
            context.Entry(dbEntity).CurrentValues.SetValues(entity);

            return dbEntity;
        }

        public static void RemoveRange<T>(this DbSet<T> dbSet, IEnumerable<object> keyValues) where T : class
        {
            foreach (var keyValue in keyValues)
            {
                var entity = dbSet.Find(keyValue);
                if (entity != null)
                    dbSet.Remove(entity);
            }
        }

        public static void RemoveRange<T>(this DbSet<T> dbSet, IEnumerable<Guid> keyValues) where T : BaseEntity
        {
            dbSet.RemoveRange(dbSet.Where(x => keyValues.Contains(x.EntityId)));
        }

        public static TEntity GetOrAttach<TEntity, TKey>(this DbContext context, TEntity entity, Expression<Func<TEntity, TKey>> keyExpression) where TEntity : class
        {
            var pi = (keyExpression.Body as MemberExpression)?.Member as PropertyInfo;
            if (pi == null)
                throw new ArgumentException("Must be a MemberExpression for property", nameof(keyExpression));

            var pkValue = pi.GetValue(entity);

            var dbSet = context.Set<TEntity>();

            var result = dbSet.Local.SingleOrDefault(e => pi.GetValue(e).Equals(pkValue));
            if (result != null) return result;

            result = dbSet.Create();
            pi.SetValue(result, pkValue);
            dbSet.Attach(result);

            var entry = context.Entry(result);
            entry.OriginalValues.SetValues(entity);
            entry.CurrentValues.SetValues(entity);
            entry.State = EntityState.Unchanged;

            return result;
        }

        public static T GetDetachedCopy<T>(this FawDataContext context, T entity) where T : class
        {
            var proxyCreationEnabled = context.Configuration.ProxyCreationEnabled;
            try
            {
                context.Configuration.ProxyCreationEnabled = false;
                var poco = context.Entry(entity).CurrentValues.ToObject() as T;
                return poco;
            }
            finally
            {
                context.Configuration.ProxyCreationEnabled = proxyCreationEnabled;
            }
        }

        public static T Clone<T>(this FawDataContext context, T entity, bool? makeProxy = null) where T : class
        {
            var proxyCreationEnabled = context.Configuration.ProxyCreationEnabled;
            try
            {
                context.Configuration.ProxyCreationEnabled = makeProxy ?? IsProxy(entity);
                var clone = context.Set<T>().Create();
                var entry = context.Entry(clone);
                entry.State = EntityState.Added;
                entry.CurrentValues.SetValues(entity);
                entry.State = EntityState.Detached;
                return clone;
            }
            finally
            {
                context.Configuration.ProxyCreationEnabled = proxyCreationEnabled;
            }
        }

        private static bool IsProxy(object value)
        {
            var t = value.GetType();
            return ObjectContext.GetObjectType(t) != t;
        }

        public static IEnumerable<TOutput> ExecuteSqlQuery<TInput, TOutput>(this FawDataContext context,
            Func<TInput, TOutput> mapperFunc,
            Expression<Func<TOutput, Guid>> keyExpression,
            string sqlQuery, params object[] parameters) where TOutput : class
        {
            if (mapperFunc == null) throw new ArgumentNullException(nameof(mapperFunc));
            if (sqlQuery == null) throw new ArgumentNullException(nameof(sqlQuery));

            var queryResutls = context.Database.SqlQuery<TInput>(sqlQuery, parameters).ToList();

            return queryResutls.Select(r => keyExpression == null ? mapperFunc(r) : context.GetOrAttach(mapperFunc(r), keyExpression)).ToList();
        }

        internal static IEnumerable<TResult> ExecuteQueryNullSafe<TResult>(this FawDataContext context, string command,
            params object[] parameters)
        {
            var list = new List<object>();
            var listVals = new List<bool>();

            for (var x = 0; x < parameters.Count(); x++)
            {
                if (parameters[x] == null || parameters[x] is DBNull)
                {
                    command = command.Replace("{" + x + "}", "NULL");
                    listVals.Add(false);
                }
                else
                {
                    list.Add(parameters[x]);
                    listVals.Add(true);
                }
            }

            var nextId = 0;
            for (var i = 0; i < listVals.Count; i++)
            {
                var isUsed = listVals[i];
                if (!isUsed)
                    continue;
                if (nextId != i)
                    command = command.Replace("{" + i + "}", "{" + nextId + "}");
                nextId++;
            }

            return context.Database.SqlQuery<TResult>(command, list.ToArray());
        }


        public static string GetTableName<T>(this FawDataContext context) where T : class
        {
            var objectContext = ((IObjectContextAdapter)context).ObjectContext;

            var sql = objectContext.CreateObjectSet<T>().ToTraceString();
            var tableNamePattern = new Regex(@"FROM \[dbo\]\.\[(?<table>.*)\] AS");
            var match = tableNamePattern.Match(sql);

            return match.Groups["table"].Value;

        }
    }
}