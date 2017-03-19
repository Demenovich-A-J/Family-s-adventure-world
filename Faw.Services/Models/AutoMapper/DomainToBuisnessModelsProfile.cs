using System;
using AutoMapper;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models.AutoMapper
{
    public class DomainToBuisnessModelsProfile : Profile
    {
        public DomainToBuisnessModelsProfile()
        {
            CreateMap<Faw.Models.Domain.User, User>()
                .ForMember(d => d.UserId, o => o.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Account, Account>()
                .ForMember(d => d.AccountId, o => o.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Claim, Claim>()
                .ForMember(d => d.ClaimId, o => o.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Family, Family>()
                .ForMember(d => d.FamilyId, o => o.MapFrom(x => x.EntityId))
                .MaxDepth(1);

            CreateMap<Faw.Models.Domain.Item, Item>()
                .ForMember(d => d.ItemId, o => o.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Quest, Quest>()
                .ForMember(d => d.QuestId, o => o.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.UserType, UserType>()
                .ForMember(dest => dest.UserTypeId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.PlayerInfo, PlayerInfo>()
                .ForMember(dest => dest.PlayerInfoId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.UserQuest, UserQuest>()
                .ForMember(dest => dest.UserQuestId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Enums.Gender, Gender>();
        }
    }
}