using TabloidMVC.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        Post GetPostIdWithComments(int id);
    }
}