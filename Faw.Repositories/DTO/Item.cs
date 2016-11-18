using System;

namespace Faw.Repositories.DTO
{
    public class Item
    {
        public Guid ItemId { get; set; }
        public Guid CreatedById { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string SiteUrl { get; set; }
        public decimal Cost { get; set; }

        public DateTime CreateOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual User CreatedBy { get; set; }
    }
}