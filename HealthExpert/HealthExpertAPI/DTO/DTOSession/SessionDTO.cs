using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOSession
{
    public class SessionDTO
    {
        public string sessionId { get; set; }
        [Required] public string sessionName { get; set; }
        [JsonIgnore] public DateTime dateStart { get; set; } = DateTime.Now;
        [JsonIgnore] public DateTime dateEnd { get; set; } = DateTime.MaxValue;
        public string description { get; set; }
        public bool learnProgress { get; set; }
        [Required] public string courseId { get; set; }
    }
}
