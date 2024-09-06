namespace HealthExpertAPI.DTO.DTOCourse
{
    public class CourseWithManagersDTO
    {
        public string courseId { get; set; }
        public string courseName { get; set; }
        public double price { get; set; }
        public double rating { get; set; }
        public string description { get; set; }
        public int studentNumber { get; set; }
        public string certificate { get; set; }
        public string createBy { get; set; }
        public DateTime dateUpdate { get; set; }
        public string language { get; set; }
        public double bmiMin { get; set; }
        public double bmiMax { get; set; }
        public int typeId { get; set; }
        //List of managers
        public List<CourseManagerDTO> managers { get; set; }
    }
}
