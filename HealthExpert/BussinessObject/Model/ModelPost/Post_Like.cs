using System.ComponentModel.DataAnnotations;

namespace BussinessObject.Model.ModelPost
{
    public class Post_Like
    {
        [Key]
        public int postLikeId { get; set; }
        public Guid postId { get; set; }
        public string userName { get; set; }
        public DateTime createdAt { get; set; }
        public virtual Post? Post { get; set; }
    }
}
