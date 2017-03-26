using Faw.Services.Models.Enums;

namespace Faw.Services.Models.Results
{
    public class ApplayExpirienceResult
    {
        public ExpirienceApplayType ExpirienceApplayType { get; set; }

        public int ResultLevel { get; set; }

        public decimal ResultExpitience { get; set; }
    }
}