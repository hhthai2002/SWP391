using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelPayment
{
    public class Bill
    {
        [Key]
        public Guid billId { get; set; }
        public Guid orderId { get; set; }
        public Guid accountId { get; set; }
        [Column(TypeName = "decimal(18, 2)")] public decimal amount { get; set; }
        public DateTime? billTime { get; set; } = DateTime.Now;

        public string bankCode { get; set; } = string.Empty;
        public string bankTranNo { get; set; } = string.Empty;
        public string cardType { get; set; } = string.Empty;
        public string orderInfo { get; set; } = string.Empty;
        public string payDate { get; set; } = string.Empty;
        public string responseCode { get; set; } = string.Empty;

        [JsonIgnore]
        public virtual Order? order { get; set; }
        [JsonIgnore]
        public virtual Account? account { get; set; }
    }
}
