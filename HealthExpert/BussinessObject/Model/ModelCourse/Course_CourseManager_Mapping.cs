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
