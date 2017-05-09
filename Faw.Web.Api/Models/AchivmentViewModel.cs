using System;

namespace Faw.Web.Api.Models
{
    public class AchivmentViewModel
    {
        public Guid? AchivmentId { get; set; }

        public string Description { get; set; }
        public string Name { get; set; }
        public string Expression { get; set; }
        public string ImageUrl { get; set; }
        public bool Enabled { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}