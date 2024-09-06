namespace HealthExpertAPI.DTO.DTOPost
{
    public class PostDTOUpdate
    {
        public string title { get; set; }
        public string content { get; set; }
        public string imageFile { get; set; }
        public DateTime createdAt { get; set; } = DateTime.Now;
        public DateTime updatedAt { get; set; } = DateTime.Now;
        public DateTime publishAt { get; set; } = DateTime.Now;
    }
}
