using System;

namespace Faw.Repositories.DTO
{
    public class Claim
    {
        public Guid ClaimId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
    }
}