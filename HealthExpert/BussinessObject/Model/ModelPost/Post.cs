using BussinessObject.Model.ModelUser;
using System.ComponentModel.DataAnnotations;

namespace BussinessObject.Model.ModelPost
{
    public class Post
    {
        [Key]
        public Guid postId { get; set; }
        public Guid accountId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public string imageFile { get; set; }
        public int likeCount { get; set; }
        public DateTime createdAt { get; set; }
        public DateTime updatedAt { get; set; }
        public DateTime publishAt { get; set; }
        public bool isActive { get; set; }
        public virtual Account? account { get; set; }
        public ICollection<Post_Category>? Post_Categories { get; set; }
        public ICollection<Post_Like>? Post_Likes { get; set; }
        public ICollection<Post_Meta>? Post_Metas { get; set; }
        public ICollection<PostDetail>? PostDetails { get; set; }
    }
}
