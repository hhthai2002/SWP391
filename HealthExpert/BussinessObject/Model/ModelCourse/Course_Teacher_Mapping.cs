namespace BussinessObject.Model.ModelCourse
{
    public class Course_Teacher_Mapping
    {
        public string courseId { get; set; }
        public int teacherId { get; set; }
        public virtual Teacher? Teacher { get; set; }
        public virtual Course? Course { get; set; }
    }
}
