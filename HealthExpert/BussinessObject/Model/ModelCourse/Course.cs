using BussinessObject.Model.ModelPayment;
using BussinessObject.Model.ModelSession;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BussinessObject.Model.ModelCourse
{
    public class Course
    {
        [Key]
        [Required]
        public string courseId { get; set; }
        [Required]
        public string courseName { get; set; }
        [Required]
        public double price { get; set; }
        public double rating { get; set; }
        [Required]
        public string description { get; set; }
        public int studentNumber { get; set; }
        public string certificate { get; set; }
        [Required]
        public string createBy { get; set; }
        public DateTime dateUpdate { get; set; } = DateTime.Now;
        [Required]
        public string language { get; set; }
        [Required]
        public double bmiMin { get; set; }
        [Required]
        public double bmiMax { get; set; }
        [Required]
        public int typeId { get; set; }
        [JsonIgnore]
        public ICollection<Enrollment>? Enrollments { get; set; }
        [JsonIgnore]
        public ICollection<Feedback>? Feedbacks { get; set; }
        [JsonIgnore]
        public virtual ServiceCenter? ServiceCenter { get; set; }
        [JsonIgnore]
        public ICollection<Course_Teacher_Mapping>? course_Teacher_Mappings { get; set; }

        [JsonIgnore]
        public ICollection<Session>? Sessions { get; set; }
        [JsonIgnore]
        public virtual ICollection<Type> Types { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order>? Orders { get; set; }
        [JsonIgnore]
        public virtual CurrentProgress? CurrentProgress { get; set; }
    }
}
