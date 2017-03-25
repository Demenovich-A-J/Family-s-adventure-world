using System;
using AutoMapper;
using Faw.Services.Models;

namespace Faw.Web.Api.Models.AutoMapper
{
    public class ViewModelsToBuisnessProfile : Profile
    {
        public ViewModelsToBuisnessProfile()
        {
            CreateMap<UserViewModel, User>()
                .ForMember(d => d.UserId, o =>
                {
                    o.Condition(s => s.UserId != Guid.Empty);
                    o.MapFrom(s => s.UserId);
                });

            CreateMap<AccountViewModel, Account>()
                .ForMember(d => d.AccountId, o =>
                {
                    o.Condition(s => s.AccountId != Guid.Empty);
                    o.MapFrom(s => s.AccountId);
                });

            CreateMap<PlayerInfoViewModel, PlayerInfo>()
                .ForMember(d => d.PlayerInfoId, o =>
                {
                    o.Condition(s => s.PlayerInfoId != Guid.Empty);
                    o.MapFrom(s => s.PlayerInfoId);
                });

            CreateMap<FamilyViewModel, Family>()
                .ForMember(d => d.FamilyId, o =>
                {
                    o.Condition(s => s.FamilyId != Guid.Empty);
                    o.MapFrom(s => s.FamilyId);
                });

            CreateMap<UserTypeViewModel, UserType>()
                .ForMember(d => d.UserTypeId, o =>
                {
                    o.Condition(s => s.UserTypeId != Guid.Empty);
                    o.MapFrom(s => s.UserTypeId);
                });

            CreateMap<QuestViewModel, Services.Models.Quest>()
                .ForMember(d => d.QuestId, o =>
                {
                    o.Condition(s => s.QuestId != Guid.Empty);
                    o.MapFrom(s => s.QuestId);
                });
        }
    }
}