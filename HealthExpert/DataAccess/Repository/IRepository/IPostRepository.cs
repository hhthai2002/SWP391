using BussinessObject.Model.ModelPost;

namespace DataAccess.Repository.IRepository
{
    public interface IPostRepository
    {
        void AddPost(Post post);
        void DeletePost(Guid postId);
        List<Post> GetPosts();
        Post GetPostById(Guid postId);
        void UpdatePost(Post post);
        void LikePost(Guid postId, string userName);
        List<PostDetail> GetPostDetails(Guid postId);
        void AddPostDetail(PostDetail postDetail);
        //update post detail
        void UpdatePostDetail(PostDetail postDetail);
    }
}
