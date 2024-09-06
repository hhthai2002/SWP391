using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOBMI
{
    public class BMIDTO
    {
        public int bmiId { get; set; }
        public double weight { get; set; }
        public double height { get; set; }
        [JsonIgnore]
        public double bmiValue { get; set; }
        [JsonIgnore]
        public string? bmiStatus { get; set; }
        public DateTime createDate { get; set; }
        public Guid accountId { get; set; }
    }
}
