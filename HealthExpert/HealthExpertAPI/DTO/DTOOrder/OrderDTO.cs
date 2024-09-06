namespace HealthExpertAPI.DTO.DTOOrder
{
    public class OrderDTO
    {
        public Guid orderId { get; set; }
        public DateTime? orderTime { get; set; }
        public decimal? price { get; set; }
        public decimal? discount { get; set; }
        public Guid? accountId { get; set; }
        public string? courseId { get; set; }
    }
}
