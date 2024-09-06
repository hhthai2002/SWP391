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
    public class CourseManagement
    {
        [Key]
        public string courseId { get; set; }
        public int courseManagerId { get; set; }
        [JsonIgnore]
        public ICollection<Account>? accounts { get; set; }
    }
}
