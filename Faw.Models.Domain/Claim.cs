using System;

namespace Faw.Models.Domain
{
    public class Claim
    {
        public Guid ClaimId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}