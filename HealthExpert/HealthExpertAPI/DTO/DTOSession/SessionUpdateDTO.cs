using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace HealthExpertAPI.DTO.DTOSession
{
    public class SessionUpdateDTO
    {
        //[JsonIgnore]
        //[Required]public string sessionId { get; set; }
        [Required] public string sessionName { get; set; }
        [JsonIgnore] public DateTime dateStart { get; set; }
        [JsonIgnore] public DateTime dateEnd { get; set; }
        public string description { get; set; }
        public bool learnProgress { get; set; }
    }
}
