﻿using System.Collections.Generic;
using TabloidFullStack.Models;


using TabloidFullStack.Models;
//using TabloidFullStack.Utils;
using System.Collections.Generic;
using System.Linq;


namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        //List<Post> GetAllPosts();
        //Post GetPostById(int id);
        void Add(Post post);
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);
        
        void Delete(int postId);
        //void UpdatePost(Post post);
    }
}