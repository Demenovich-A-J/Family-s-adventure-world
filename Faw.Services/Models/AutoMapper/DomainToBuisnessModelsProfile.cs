using System;
using AutoMapper;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models.AutoMapper
{
    public class DomainToBuisnessModelsProfile : Profile
    {
        [Obsolete]
        protected override void Configure()
        {
            CreateMap<Faw.Models.Domain.User, User>();
            CreateMap<Faw.Models.Domain.Account, Account>();
            CreateMap<Faw.Models.Domain.Claim, Claim>();
            CreateMap<Faw.Models.Domain.Family, Family>();
            CreateMap<Faw.Models.Domain.Item, Item>();
            CreateMap<Faw.Models.Domain.Quest, User>();
            CreateMap<Faw.Models.Domain.UserType, UserType>();
            CreateMap<Faw.Models.Domain.Enums.Gender, Gender>();
        }
    }
}