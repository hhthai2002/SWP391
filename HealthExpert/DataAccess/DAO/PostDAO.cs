using BussinessObject.ContextData;
using BussinessObject.Model.ModelPost;

namespace DataAccess.DAO
{
    //PostDAO
    public class PostDAO
    {
        public static void AddPost(Post post)
        {
            using (var context = new HealthExpertContext())
            {
                context.Posts.Add(post);
                context.SaveChanges();
            }
        }

        //Add Post Detail
        public static void AddPostDetail(PostDetail postDetail)
        {
            using (var context = new HealthExpertContext())
            {
                context.PostDetails.Add(postDetail);
                context.SaveChanges();
            }
        }

        public static void DeletePost(Guid postId)
        {
            using (var context = new HealthExpertContext())
            {
                var post = context.Posts.Find(postId);
                context.Posts.Remove(post);
                context.SaveChanges();
            }
        }

        public static List<Post> GetPosts()
        {
            using (var context = new HealthExpertContext())
            {
                return context.Posts.ToList();
            }
        }

        public static Post GetPostById(Guid postId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.Posts.Find(postId);
            }
        }

        public static void UpdatePost(Post post)
        {
            using (var context = new HealthExpertContext())
            {
                var existingPost = context.Posts.Find(post.postId);
                if (existingPost == null)
                {
                    throw new Exception("Post not found!!!");
                }
                existingPost.title = post.title;
                existingPost.content = post.content;
                existingPost.updatedAt = post.updatedAt;
                existingPost.publishAt = post.publishAt;
                existingPost.imageFile = post.imageFile;
                context.Posts.Update(existingPost);
                context.SaveChanges();
            }
        }

        //update post detail
        public static void UpdatePostDetail(PostDetail postDetail)
        {
            using (var context = new HealthExpertContext())
            {
                var existingPostDetail = context.PostDetails.FirstOrDefault(pd => pd.postDetailId == postDetail.postDetailId);
                if (existingPostDetail == null)
                {
                    throw new Exception("Post Detail not found!!!");
                }
                existingPostDetail.postTitle = postDetail.postTitle;
                existingPostDetail.postDescription = postDetail.postDescription;
                context.PostDetails.Update(existingPostDetail);
                context.SaveChanges();
            }
        }

        //PostLike method
        public static void LikePost(Guid postId, string userName)
        {
            using (var context = new HealthExpertContext())
            {
                var post = context.Posts.FirstOrDefault(p => p.postId == postId);
                //var existingUser = context.Accounts.FirstOrDefault(a => a.userName == userName);
                if (post != null)
                {
                    var existingLike = context.Post_Likes.FirstOrDefault(pl =>
                    pl.postId == postId && pl.userName == userName);

                    if (existingLike == null)
                    {
                        Post_Like postLike = new Post_Like
                        {
                            postId = postId,
                            userName = userName,
                            createdAt = DateTime.Now
                        };
                        context.Post_Likes.Add(postLike);
                        post.likeCount++;
                        context.SaveChanges();
                    }
                    else
                    {
                        context.Post_Likes.Remove(existingLike);
                        post.likeCount--;
                        context.SaveChanges();
                    }
                }
                else
                {
                    throw new Exception("Post not found!!");
                }
            }
        }

        //Get PostDetail
        public static List<PostDetail> GetPostDetails(Guid postId)
        {
            using (var context = new HealthExpertContext())
            {
                return context.PostDetails.Where(pd => pd.postId == postId).ToList();
            }
        }

    }
}
