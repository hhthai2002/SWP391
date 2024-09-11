using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class CourseManagement
    {
        [Key]
        public string courseId { get; set; }
        public int courseManagerId { get; set; }
        [JsonIgnore]
        public ICollection<Account>? accounts { get; set; }
    }
}
