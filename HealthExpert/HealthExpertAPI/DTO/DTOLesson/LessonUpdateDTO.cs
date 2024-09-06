using System.ComponentModel.DataAnnotations;

namespace HealthExpertAPI.DTO.DTOLesson
{
    public class LessonUpdateDTO
    {
        [Required] public string caption { get; set; } //Lesson Name
        [Required] public string cover { get; set; }
        [Required] public bool isActive { get; set; }
    }
}
