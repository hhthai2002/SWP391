namespace HealthExpertAPI.DTO.DTOOrder
{
    public class CheckoutDTO
    {
        public bool isAccount { get; set; }
        public Guid orderId { get; set; }
        public Guid? accountId { get; set; }
        public string? courseId { get; set; }
        public string? name { get; set; }
        public decimal? price { get; set; }
        public DateTime? dateRegister { get; set; }
    }
}
