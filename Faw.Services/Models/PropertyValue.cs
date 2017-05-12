using System;
using ValueType = Faw.Services.Models.Enums.ValueType;

namespace Faw.Services.Models
{
    public class PropertyValue
    {
        public Guid PropertyValueId { get; set; }
        public string PropertyName { get; set; }
        public string Value { get; set; }
        public ValueType? ValueType { get; set; }
    }
}