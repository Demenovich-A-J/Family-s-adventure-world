using System;

namespace Faw.Models.Domain
{
    public class Setting
    {
        public Guid SettingId { get; set; }

        public string Name { get; set; }
        public string Value { get; set; }
    }
}