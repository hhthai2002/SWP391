using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelPost
{
    public class Post_Category
    {
        public Guid postId { get; set; }
        public int categoryId { get; set; }
        public virtual Post? post { get; set; }
        public virtual Category? category { get; set; }
    }
}
