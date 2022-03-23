using System.Collections.Generic;
using TabloidFullStack.Models;


using TabloidFullStack.Models;
//using TabloidFullStack.Utils;
using System.Collections.Generic;
using System.Linq;


namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        void Add(Post post);
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);
        Post GetUserPostById(int id, int userProfileId);
        List<Post> GetUserPostById(int userProfileId);
        void Delete(int postId);
        //void UpdatePost(Post post);
    }
}