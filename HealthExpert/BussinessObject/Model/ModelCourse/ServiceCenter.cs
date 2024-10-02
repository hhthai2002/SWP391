using BussinessObject.Model.ModelUser;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class ServiceCenter
    {
        public string courseId { get; set; }
        public Guid accountId { get; set; }
        [JsonIgnore]
        public ICollection<Course>? Courses { get; set; }
        [JsonIgnore]
        public ICollection<Account>? Account { get; set; }
    }
}
