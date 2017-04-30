using System;
using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class ExpressionProperty : BaseEntity
    {
        public Guid AchivmentId { get; set; }
        public Guid LeftPropertyValueId { get; set; }
        public Guid RightPropertyValueId { get; set; }

        public string ModelName { get; set; }
        public int Order { get; set; }

        public Comparer Comparer { get; set; }
        public Connector? Connector { get; set; }

        public PropertyValue LeftPropertyValue { get; set; }
        public PropertyValue RightPropertyValue { get; set; }

        public Achivment Achivment { get; set; }
    }
}