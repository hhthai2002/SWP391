using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class CurrentProgress
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid AccountId { get; set; }
        [JsonIgnore]
        public virtual Account? Account { get; set; }
        [Required]
        public string courseId { get; set; }
        [JsonIgnore]
        public virtual Course? Course { get; set; }
        public string CurrentSessionId { get; set; }
        public string CurrentLessonId { get; set; }

    }
}
