using System;

namespace Faw.Models.Domain
{
    public class Achivment : BaseEntity
    {
        public string Description { get; set; }
        public string Name { get; set; }
        public string Expression { get; set; }
        public string ImageUrl { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}