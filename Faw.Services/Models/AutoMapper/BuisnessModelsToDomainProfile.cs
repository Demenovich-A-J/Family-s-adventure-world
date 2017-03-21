using System;
using AutoMapper;
using Faw.Services.Models.Enums;

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
                });

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
                });

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
                });

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
                .ForMember(dest => dest.EntityId, opt => opt.MapFrom(x => x.UserTypeId));

            CreateMap<Gender, Faw.Models.Domain.Enums.Gender>();
            CreateMap<UserQuestStatus, Faw.Models.Domain.Enums.UserQuestStatus>();
            CreateMap<AccountStatus, Faw.Models.Domain.Enums.AccountStatus>();
        }
    }
}