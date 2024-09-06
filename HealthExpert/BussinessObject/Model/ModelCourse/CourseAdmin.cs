using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

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
