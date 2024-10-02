using System.ComponentModel.DataAnnotations;

namespace BussinessObject.Model.ModelPost
{
    public class Category
    {
        [Key]
        public int categoryId { get; set; }
        public string title { get; set; }
        public string content { get; set; }
        public ICollection<Post_Category>? Post_Categories { get; set; }
    }
}
