using BussinessObject.Model.ModelCourse;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelPayment
{
    public class Order
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid orderId { get; set; }
        public DateTime? orderTime { get; set; }
        [Column(TypeName = "decimal(18, 2)")] public decimal? price { get; set; }
        [Column(TypeName = "decimal(18, 2)")]  public decimal? discount { get; set; }
        [Required]public Guid? accountId { get; set; }
        [Required] public string? courseId { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderStatus>? OrderStatuses { get; set; }
        [JsonIgnore]
        public virtual Course? Course { get; set; }
    }
}
