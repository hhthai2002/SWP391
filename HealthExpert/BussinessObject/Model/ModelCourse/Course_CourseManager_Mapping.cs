using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelCourse
{
    public class Course_CourseManager_Mapping
    {
        public string courseId { get; set; }
        public int courseManagerId { get; set; }
        public virtual CourseManagement? courseManagement { get; set; }
        public virtual Course? course { get; set; }
    }
}
