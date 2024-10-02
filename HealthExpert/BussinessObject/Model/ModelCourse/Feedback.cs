using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public virtual Account? Account { get; set; }
        [JsonIgnore]
        public virtual Course? Course { get; set; }
    }
}
