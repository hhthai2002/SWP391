using System.ComponentModel.DataAnnotations;

namespace BussinessObject.Model.ModelPost
{
    public class Post_Meta
    {
        [Key]
        public int postMetaId { get; set; }
        public Guid postId { get; set; }
        public string hashTag { get; set; }
        public string content { get; set; }
        public virtual Post? Post { get; set; }
    }
}
