using System;
using AutoMapper;
using Faw.Services.Models;

namespace Faw.Web.Api.Models.AutoMapper
{
    public class BuisnessModelsToViewProfile : Profile
    {
        public BuisnessModelsToViewProfile()
        {
            CreateMap<User, UserViewModel>()
                .ForMember(d => d.UserId, o =>
                {
                    o.Condition(s => s.UserId != Guid.Empty);
                    o.MapFrom(s => s.UserId);
                });

            CreateMap<Account, AccountViewModel>()
                .ForMember(d => d.AccountId, o =>
                {
                    o.Condition(s => s.AccountId != Guid.Empty);
                    o.MapFrom(s => s.AccountId);
                });

            CreateMap<PlayerInfo, PlayerInfoViewModel>()
                .ForMember(d => d.PlayerInfoId, o =>
                {
                    o.Condition(s => s.PlayerInfoId != Guid.Empty);
                    o.MapFrom(s => s.PlayerInfoId);
                });

            CreateMap<Family, FamilyViewModel>()
                .ForMember(d => d.FamilyId, o =>
                {
                    o.Condition(s => s.FamilyId != Guid.Empty);
                    o.MapFrom(s => s.FamilyId);
                });

            CreateMap<UserType, UserTypeViewModel>()
                .ForMember(d => d.UserTypeId, o =>
                {
                    o.Condition(s => s.UserTypeId != Guid.Empty);
                    o.MapFrom(s => s.UserTypeId);
                });

            CreateMap<Services.Models.Quest, QuestViewModel>()
                .ForMember(d => d.QuestId, o =>
                {
                    o.Condition(s => s.QuestId != Guid.Empty);
                    o.MapFrom(s => s.QuestId);
                });
        }
    }
}