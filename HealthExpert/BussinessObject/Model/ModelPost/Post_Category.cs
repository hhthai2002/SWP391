namespace BussinessObject.Model.ModelPost
{
    public class Post_Category
    {
        public Guid postId { get; set; }
        public int categoryId { get; set; }
        public virtual Post? Post { get; set; }
        public virtual Category? Category { get; set; }
    }
}
