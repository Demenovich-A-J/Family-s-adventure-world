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

            CreateMap<Faw.Models.Domain.Expirience, Expirience>()
                .ForMember(dest => dest.ExpirienceId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Achivment, Achivment>()
                .ForMember(dest => dest.AchivmentId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.UserAchivment, UserAchivment>()
                .ForMember(dest => dest.UserAchivmentId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.ExpressionProperty, ExpressionProperty>()
                .ForMember(dest => dest.ExpressionPropertyId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.PropertyValue, PropertyValue>()
                .ForMember(dest => dest.PropertyValueId, opt => opt.MapFrom(x => x.EntityId));

            CreateMap<Faw.Models.Domain.Enums.Gender, Gender>();
            CreateMap<Faw.Models.Domain.Enums.UserQuestStatus, UserQuestStatus>();
            CreateMap<Faw.Models.Domain.Enums.AccountStatus, AccountStatus>();
            CreateMap<Faw.Models.Domain.Enums.QuestСomplexity, QuestСomplexity>();
            CreateMap<Faw.Models.Domain.Enums.Comparer, Comparer>();
            CreateMap<Faw.Models.Domain.Enums.Connector, Connector>();
            CreateMap<Faw.Models.Domain.Enums.ValueType, ValueType>();
        }
    }
}