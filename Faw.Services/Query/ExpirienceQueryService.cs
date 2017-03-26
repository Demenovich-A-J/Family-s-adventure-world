﻿using System;
using System.Linq;
using AutoMapper;
using Core.Infrastructure;
using Faw.Repositories.Contracts;
using Faw.Services.Contracts.Query;
using Faw.Services.Models;
using Faw.Services.Models.Enums;
using Faw.Services.Models.Results;
using Mehdime.Entity;

namespace Faw.Services.Query
{
    public class ExpirienceQueryService : Service, IExpirienceQueryService
    {
        private readonly IExpirienceRepository _expirienceRepository;

        public ExpirienceQueryService(
            IMapper mapper,
            IDbContextScopeFactory contextScopeFactory,
            IExpirienceRepository expirienceRepository)
            : base(mapper, contextScopeFactory)
        {
            _expirienceRepository = expirienceRepository;
        }

        public IOrderedEnumerable<Expirience> GetExpirienceList()
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return
                    Mapper.Map<IOrderedEnumerable<Expirience>>(
                        _expirienceRepository.GetWhere(x => x.EntityId != Guid.Empty).OrderByDescending(x => x.Level));
            }
        }

        public ApplayExpirienceResult ApplayExpirience(PlayerInfo playerInfo, decimal expirience)
        {
            var result = new ApplayExpirienceResult
            {
                ExpirienceApplayType = ExpirienceApplayType.Ok,
                ResultLevel = playerInfo.Level
            };

            var expirienceCurrentLevel = GetInternal(playerInfo.Level);

            result.ResultExpitience = playerInfo.ExpirienceAmount + expirience;

            if (result.ResultExpitience < expirienceCurrentLevel.ExpirienceAmount)
                return result;

            result.ResultExpitience = playerInfo.Level + 1;
            result.ResultExpitience = result.ResultExpitience - expirienceCurrentLevel.ExpirienceAmount;
            result.ExpirienceApplayType = ExpirienceApplayType.LevelUp;

            return result;
        }

        public decimal CalculateExpirience(int requiredLevel, QuestСomplexity questСomplexity)
        {
            var expirience = GetInternal(requiredLevel);
            var coefficient = GetComplexityCoefficient(questСomplexity);

            var result = expirience.ExpirienceAmount/coefficient;

            return result;
        }

        private decimal GetComplexityCoefficient(QuestСomplexity questСomplexity)
        {
            int coefficient;

            switch (questСomplexity)
            {
                case QuestСomplexity.Easy:
                    coefficient = RandomNumber.Between(8, 10);
                    break;
                case QuestСomplexity.Medium:
                    coefficient = RandomNumber.Between(6, 8); ;
                    break;
                case QuestСomplexity.Hard:
                    coefficient = RandomNumber.Between(3, 6); ;
                    break;
                case QuestСomplexity.Impossible:
                    coefficient = RandomNumber.Between(1, 3); ;
                    break;
                default:
                    coefficient = 10000;
                    break;
            }

            return coefficient;
        }

        private Expirience GetInternal(int level)
        {
            using (ContextScopeFactory.CreateReadOnly())
            {
                return Mapper.Map<Expirience>(_expirienceRepository.Get(level));
            }
        }
    }
}