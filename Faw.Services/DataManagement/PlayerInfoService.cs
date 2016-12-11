using System;
using AutoMapper;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class PlayerInfoService : Service, IPlayerInfoService
    {
        private readonly IPlayerInfoRepository _playerInfoRepository;

        private readonly IUserQueryService _userQueryService;

        public PlayerInfoService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IUserQueryService userQueryService,
            IPlayerInfoRepository playerInfoRepository)
            : base(mapper, contextScopeFactory)
        {
            _userQueryService = userQueryService;
            _playerInfoRepository = playerInfoRepository;
        }

        public void AdjustPlayerExpirience(Guid userId, float expirienceAmount)
        {
            var user = _userQueryService.GetUserById(userId);

            var playerInfoDomain = _mapper.Map<PlayerInfo>(user.PlayerInfo);

            //TODO: Add expirience service to calculate when to player get new level.
            playerInfoDomain.ExpirienceAmount += expirienceAmount;

            using (var contextScope = _contextScopeFactory.Create())
            {
                _playerInfoRepository.Update(playerInfoDomain);

                contextScope.SaveChanges();
            }
        }
    }
}