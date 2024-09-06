using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelPayment
{
    public class OrderStatus
    {
        [Key]
        public Guid orderStatusId { get; set; }
        [Required] public DateTime? time { get; set; }
        [Required] public string? status { get; set; }
        public Guid? orderId { get; set; }

        [JsonIgnore]
        public virtual Order? order { get; set; }
    }
}
