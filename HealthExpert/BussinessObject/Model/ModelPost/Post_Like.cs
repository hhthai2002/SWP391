using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelPost
{
    public class Post_Like
    {
        [Key]
        public int postLikeId { get; set; }
        public Guid postId { get; set; }
        public string userName { get; set; }
        public DateTime createdAt { get; set; }
        public virtual Post? post { get; set; }
    }
}
