using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
        public virtual Account? account { get; set; }
    }
}
