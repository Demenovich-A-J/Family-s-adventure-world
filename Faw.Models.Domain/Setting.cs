using System;

namespace Faw.Models.Domain
{
    public class Setting : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}