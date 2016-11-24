using System;
using AutoMapper;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models.AutoMapper
{
    public class BuisnessModelsToDomainProfile : Profile
    {
        [Obsolete]
        protected override void Configure()
        {
            CreateMap<User, Faw.Models.Domain.User>()
                .ForMember(m => m.EntityId, opt => opt.MapFrom(x => x.UserId));

            CreateMap<Account, Faw.Models.Domain.Account>()
                .ForMember(m => m.EntityId, opt => opt.MapFrom(x => x.AccountId));

            CreateMap<Claim, Faw.Models.Domain.Claim>();
            CreateMap<Family, Faw.Models.Domain.Family>();
            CreateMap<Item, Faw.Models.Domain.Item>();
            CreateMap<Quest, Faw.Models.Domain.User>();
            CreateMap<UserType, Faw.Models.Domain.UserType>();
            CreateMap<Gender, Faw.Models.Domain.Enums.Gender>();
        }
    }
}