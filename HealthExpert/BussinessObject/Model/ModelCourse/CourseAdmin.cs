using BussinessObject.Model.ModelUser;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class CourseAdmin
    {
        public string courseId { get; set; }
        public Guid accountId { get; set; }
        [JsonIgnore]
        public ICollection<Course>? courses { get; set; }
        [JsonIgnore]
        public ICollection<Account>? account { get; set; }
    }
}
