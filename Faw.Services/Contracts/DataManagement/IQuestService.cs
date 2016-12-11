using System;
using Faw.Services.Models;

namespace Faw.Services.Contracts.DataManagement
{
    public interface IQuestService
    {
        void Create(Quest quest);
        void Edit(Quest quest);
    }
}