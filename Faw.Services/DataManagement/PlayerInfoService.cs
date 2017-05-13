using System;
using AutoMapper;
using Faw.Models.Domain;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.DataManagement;
using Faw.Services.Contracts.Query;
using Faw.Services.Models.Enums;
using Mehdime.Entity;

namespace Faw.Services.DataManagement
{
    public class PlayerInfoService : Service, IPlayerInfoService
    {
        private readonly IPlayerInfoRepository _playerInfoRepository;
        private readonly IUserQueryService _userQueryService;
        private readonly IExpirienceRepository _expirienceRepository;
        private readonly IExpirienceQueryService _expirienceQueryService;

        public PlayerInfoService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IUserQueryService userQueryService,
            IPlayerInfoRepository playerInfoRepository,
            IExpirienceRepository expirienceRepository,
            IExpirienceQueryService expirienceQueryService)
            : base(mapper, contextScopeFactory)
        {
            _userQueryService = userQueryService;
            _playerInfoRepository = playerInfoRepository;
            _expirienceRepository = expirienceRepository;
            _expirienceQueryService = expirienceQueryService;
        }

        public void AdjustPlayerExpirience(Guid userId, decimal expirienceAmount)
        {
            var user = _userQueryService.Get(userId);

            using (var contextScope = ContextScopeFactory.Create())
            {
                var domain = _playerInfoRepository.GetById(user.PlayerInfoId);

                var result = _expirienceQueryService.ApplayExpirience(user.PlayerInfo, expirienceAmount);

                domain.ExpirienceAmount = result.ResultExpitience;
                domain.Level = result.ResultLevel;

                _playerInfoRepository.Update(domain);

                contextScope.SaveChanges();
            }
        }
    }
}