using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class Enrollment
    {
        [Key]
        public Guid accountId { get; set; }
        [Key]
        public string courseId { get; set; }
        public DateTime enrollDate { get; set; } = DateTime.Now;
        public bool enrollStatus { get; set; }
        [JsonIgnore]
        public virtual Account? Account { get; set; }
        [JsonIgnore]
        public virtual Course? Course { get; set; }
    }
}
