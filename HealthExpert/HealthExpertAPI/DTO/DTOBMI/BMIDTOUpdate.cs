using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOBMI
{
    public class BMIDTOUpdate
    {
        public double weight { get; set; }
        public double height { get; set; }
        [JsonIgnore]
        public double bmiValue { get; set; }
        [JsonIgnore]
        public string? bmiStatus { get; set; }
        public DateTime createDate { get; set; }
        [JsonIgnore]
        public Guid accountId { get; set; }
    }
}
