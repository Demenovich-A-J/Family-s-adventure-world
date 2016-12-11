﻿using Faw.Models.Domain;

namespace Faw.DataContext.EntityTypeConfigurations
{
    public class UserQuestEntityConfiguration : BaseEntityTypeConfiguration<UserQuest>
    {
        public UserQuestEntityConfiguration() : base("UserQuestId")
        {
            HasRequired(x => x.User)
                .WithMany()
                .HasForeignKey(x => x.UserId);

            HasRequired(x => x.Quest)
                .WithMany()
                .HasForeignKey(x => x.QuestId);

            HasOptional(x => x.ParentUserQuest)
                .WithMany()
                .HasForeignKey(x => x.ParentUserQuestId);
        }
    }
}