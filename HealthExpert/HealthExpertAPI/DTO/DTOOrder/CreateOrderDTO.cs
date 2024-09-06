using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOOrder
{
    public class CreateOrderDTO
    {
        [JsonIgnore]
        public DateTime? orderTime { get; set; } = DateTime.Now;
        [JsonIgnore]
        public decimal? price { get; set; }
        public decimal? discount { get; set; }
        public Guid? accountId { get; set; }
        public string? courseId { get; set; }
    }
}
