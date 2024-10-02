namespace BussinessObject.Model.ModelPost
{
    public class PostDetail
    {
        public Guid postDetailId { get; set; }
        public Guid postId { get; set; }
        public string postTitle { get; set; }
        public string postDescription { get; set; }
        public virtual Post? Post { get; set; }
    }
}
