using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOCourse
{
    public class CourseDTOUpdate
    {
        public string courseName { get; set; }
        public double price { get; set; }
        public double rating { get; set; }
        public string description { get; set; }
        public int studentNumber { get; set; }
        public string certificate { get; set; }
        public string createBy { get; set; }
        public DateTime dateUpdate { get; set; } = DateTime.Now;
        public string language { get; set; }
        public double bmiMin { get; set; }
        public double bmiMax { get; set; }
        public int typeId { get; set; }
    }
}
