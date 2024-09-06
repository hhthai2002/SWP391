using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessObject.Model.ModelPost
{
    public class Category
    {
        [Key]
        public int categoryId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public ICollection<Post_Category>? post_Categories { get; set; }
    }
}
