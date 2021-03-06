﻿using System;
using AutoMapper;
using Faw.Services.Models.Enums;
using ValueType = Faw.Services.Models.Enums.ValueType;

namespace Faw.Services.Models.AutoMapper
{
    public class BuisnessModelsToDomainProfile : Profile
    {
        public BuisnessModelsToDomainProfile()
        {
            CreateMap<User, Faw.Models.Domain.User>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.UserId != Guid.Empty);
                    o.MapFrom(s => s.UserId);
                })
                .MaxDepth(2);

            CreateMap<Account, Faw.Models.Domain.Account>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.AccountId != Guid.Empty);
                    o.MapFrom(s => s.AccountId);
                });

            CreateMap<UserType, Faw.Models.Domain.UserType>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.UserTypeId != Guid.Empty);
                    o.MapFrom(s => s.UserTypeId);
                });

            CreateMap<Claim, Faw.Models.Domain.Claim>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.ClaimId != Guid.Empty);
                    o.MapFrom(s => s.ClaimId);
                });

            CreateMap<Family, Faw.Models.Domain.Family>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.FamilyId != Guid.Empty);
                    o.MapFrom(s => s.FamilyId);
                })
                .ForMember(x => x.CreatedOn, o => o.Ignore());

            CreateMap<Item, Faw.Models.Domain.Item>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.ItemId != Guid.Empty);
                    o.MapFrom(s => s.ItemId);
                });

            CreateMap<Quest, Faw.Models.Domain.Quest>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.QuestId != Guid.Empty);
                    o.MapFrom(s => s.QuestId);
                })
                .ForMember(x => x.QuestСomplexityString, o => o.MapFrom(s => s.QuestСomplexity));

            CreateMap<PlayerInfo, Faw.Models.Domain.PlayerInfo>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.PlayerInfoId != Guid.Empty);
                    o.MapFrom(s => s.PlayerInfoId);
                });

            CreateMap<UserQuest, Faw.Models.Domain.UserQuest>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.UserQuestId != Guid.Empty);
                    o.MapFrom(s => s.UserQuestId);
                });

            CreateMap<UserType, Faw.Models.Domain.UserType>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.UserTypeId != Guid.Empty);
                    o.MapFrom(s => s.UserTypeId);
                });

            CreateMap<Expirience, Faw.Models.Domain.Expirience>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.ExpirienceId != Guid.Empty);
                    o.MapFrom(s => s.ExpirienceId);
                });

            CreateMap<Achivment, Faw.Models.Domain.Achivment>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.AchivmentId != Guid.Empty);
                    o.MapFrom(s => s.AchivmentId);
                }).MaxDepth(2);

            CreateMap<UserAchivment, Faw.Models.Domain.UserAchivment>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.UserAchivmentId != Guid.Empty);
                    o.MapFrom(s => s.UserAchivmentId);
                });

            CreateMap<ExpressionProperty, Faw.Models.Domain.ExpressionProperty>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.ExpressionPropertyId != Guid.Empty);
                    o.MapFrom(s => s.ExpressionPropertyId);
                }).MaxDepth(2);

            CreateMap<PropertyValue, Faw.Models.Domain.PropertyValue>()
                .ForMember(d => d.EntityId, o =>
                {
                    o.Condition(s => s.PropertyValueId != Guid.Empty);
                    o.MapFrom(s => s.PropertyValueId);
                }).MaxDepth(2);

            CreateMap<Gender, Faw.Models.Domain.Enums.Gender>();
            CreateMap<UserQuestStatus, Faw.Models.Domain.Enums.UserQuestStatus>();
            CreateMap<AccountStatus, Faw.Models.Domain.Enums.AccountStatus>();
            CreateMap<QuestСomplexity, Faw.Models.Domain.Enums.QuestСomplexity>();
            CreateMap<Comparer, Faw.Models.Domain.Enums.Comparer>();
            CreateMap<Connector, Faw.Models.Domain.Enums.Connector>();
            CreateMap<ValueType, Faw.Models.Domain.Enums.ValueType>();
        }
    }
}