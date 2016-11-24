using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class BaseEntityTypeConfiguration<T> : EntityTypeConfiguration<T> where T : BaseEntity
    {
        protected BaseEntityTypeConfiguration(string keyColumnName)
        {
            if (keyColumnName == null) throw new ArgumentNullException(nameof(keyColumnName));

            Property(e => e.EntityId)
                .HasColumnName(keyColumnName)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);

            HasKey(e => e.EntityId);
        }
    }
}