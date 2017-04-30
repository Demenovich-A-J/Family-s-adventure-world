using Faw.Models.Domain.Enums;

namespace Faw.Models.Domain
{
    public class PropertyValue : BaseEntity
    {
        public string PropertyName { get; set; }
        public string Value { get; set; }
        public ValueType? ValueType { get; set; }
    }
}