namespace HealthExpertAPI.DTO.DTOOrder
{
    public class BillDTO
    {
        public Guid billId { get; set; }
        public Guid accountId { get; set; }
        public Guid orderId { get; set; }
        public decimal amount { get; set; } = 0;
        public string bankCode { get; set; } = string.Empty;
        public string bankTranNo { get; set; } = string.Empty;
        public string cardType { get; set; } = string.Empty;
        public string orderInfo { get; set; } = string.Empty;
        public string payDate { get; set; } = string.Empty;
        public string responseCode { get; set; } = string.Empty;
    }
}
