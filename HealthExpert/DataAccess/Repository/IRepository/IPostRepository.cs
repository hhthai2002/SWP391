using BussinessObject.Model.ModelPost;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
