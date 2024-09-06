using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelCourse
{
    public class Feedback
    {
        [Key]
        public Guid feedbackId { get; set; }
        public Guid accountId { get; set; }
        public string courseId { get; set; }
        public string detail { get; set; }
        public DateTime createDate { get; set; } = DateTime.Now;
        [JsonIgnore]
        public virtual Account? account { get; set; }
        [JsonIgnore]
        public virtual Course? course { get; set; }
    }
}
