﻿using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class FamilyEntityConfiguration : EntityTypeConfiguration<Family>
    {
        public FamilyEntityConfiguration()
        {
            HasKey(f => f.EntityId);

            Property(f => f.EntityId)
                .HasColumnName("FamilyId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            HasRequired(f => f.CreatedBy)
                .WithMany()
                .HasForeignKey(f => f.CreatedById);

            HasMany(f => f.FamilyMemebers)
                .WithOptional(u => u.Family)
                .HasForeignKey(u => u.FamilyId);
        }
    }
}