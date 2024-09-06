namespace HealthExpertAPI.DTO.DTOPost
{
    public class PostDetailDTO
    {
        public Guid postDetailId { get; set; }
        public Guid postId { get; set; }
        public string postTitle { get; set; }
        public string postDescription { get; set; }
    }
}
