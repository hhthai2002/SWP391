using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelPost
{
    public class Post_Meta
    {
        [Key]
        public int postMetaId { get; set; }
        public Guid postId { get; set; }
        public string hashTag { get; set; }
        public string content { get; set; }
        public virtual Post? post { get; set; }
    }
}
