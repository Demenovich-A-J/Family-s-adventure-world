using AutoMapper;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models.AutoMapper
{
    public class BuisnessModelsToDomainProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<User, Faw.Models.Domain.User>();
            CreateMap<Account, Faw.Models.Domain.Account>();
            CreateMap<Claim, Faw.Models.Domain.Claim>();
            CreateMap<Family, Faw.Models.Domain.Family>();
            CreateMap<Item, Faw.Models.Domain.Item>();
            CreateMap<Quest, Faw.Models.Domain.User>();
            CreateMap<UserType, Faw.Models.Domain.UserType>();
            CreateMap<Gender, Faw.Models.Domain.Enums.Gender>();
        }
    }
}