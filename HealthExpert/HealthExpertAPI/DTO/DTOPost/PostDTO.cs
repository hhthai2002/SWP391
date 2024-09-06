namespace HealthExpertAPI.DTO.DTOPost
{
    public class PostDTO
    {
        public Guid accountId { get; set; }
        public Guid postId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string imageFile { get; set; }
        public int likeCount { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public DateTime publishAt { get; set; }
    }
}
