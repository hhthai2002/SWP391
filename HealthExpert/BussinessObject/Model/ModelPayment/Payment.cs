using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelPayment
{
    public class PaymentResponse
    {
        [Key]
        public int paymentId { get; set; }
        public bool success { get; set; }
        public string paymentMethod { get; set; }
        public string orderDescription { get; set; }
        public string transactionId { get; set; }
        public string token { get; set; }
        public string vnPayResponseCode { get; set; }

        [Required]public Guid? orderId { get; set; }

        [JsonIgnore]
        public virtual Order? order { get; set; }
    }

    public class PaymentRequest
    {
        public Guid? orderId { get; set; }
        [Column(TypeName = "decimal(18, 2)")] public decimal? amount { get; set; }
        public DateTime createdDate { get; set; }

        [JsonIgnore]
        public virtual Order? order { get; set; }
    }
}
