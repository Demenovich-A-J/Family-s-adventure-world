using System;

namespace Faw.Services.Models
{
    public class PlayerInfo
    {
        public Guid PlayerInfoId { get; set; }
        public int Level { get; set; }
        public decimal ExpirienceAmount { get; set; }
    }
}