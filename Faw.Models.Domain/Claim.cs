using System;

namespace Faw.Models.Domain
{
    public class Claim : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}