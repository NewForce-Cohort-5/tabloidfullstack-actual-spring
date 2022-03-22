using System.Collections.Generic;
using TabloidMVC.Models;


using TabloidFullStack.Models;
using TabloidFullStack.Utils;
using System.Collections.Generic;
using System.Linq;


namespace TabloidFullStack.Repositories
{
    public interface IPostRepository
    {
        //void Add(Post post);
        //void Delete(int id);
        List<Post> GetAll();
        //List<Post> GetAllWithComments();
        //Post GetById(int id);
        //void Update(Post post);
    }
}