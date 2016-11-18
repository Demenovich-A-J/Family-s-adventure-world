using AutoMapper;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models.AutoMapper
{
    public class DtoToBuisnessModelsProfile : Profile
    {
        protected override void Configure()
        {
            CreateMap<Repositories.DTO.User, User>();
            CreateMap<Repositories.DTO.Account, Account>();
            CreateMap<Repositories.DTO.Claim, Claim>();
            CreateMap<Repositories.DTO.Family, Family>();
            CreateMap<Repositories.DTO.Item, Item>();
            CreateMap<Repositories.DTO.Quest, User>();
            CreateMap<Repositories.DTO.UserType, UserType>();
            CreateMap<Repositories.DTO.Gender, Gender>();
        }
    }
}