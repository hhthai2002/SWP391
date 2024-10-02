using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelUser
{
    public class BMI
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int bmiId { get; set; }
        public double weight { get; set; }
        public double height { get; set; }
        public double bmiValue { get; set; }
        public string bmiStatus { get; set; }
        public DateTime bmiDate { get; set; } = DateTime.Now;
        [JsonIgnore]
        public bool isActive { get; set; }
        public Guid accountId { get; set; }
        [JsonIgnore]
        public virtual Account? Account { get; set; }
    }
}
