using System;
using Faw.Services.Models.Enums;

namespace Faw.Services.Models
{
    public class ExpressionProperty
    {
        public Guid ExpressionPropertyId { get; set; }
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