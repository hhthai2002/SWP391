using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class Teacher
    {
        [Key]
        public string courseId { get; set; }
        public int teacherId { get; set; }
        [JsonIgnore]
        public ICollection<Account>? Accounts { get; set; }
    }
}
