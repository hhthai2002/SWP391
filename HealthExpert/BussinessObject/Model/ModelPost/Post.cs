using BussinessObject.Model.ModelUser;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public ICollection<Post_Category>? post_Categories { get; set; }
        public ICollection<Post_Like>? post_Likes { get; set; }
        public ICollection<Post_Meta>? post_Metas { get; set; }
        public ICollection<PostDetail>? postDetails { get; set; }
    }
}
