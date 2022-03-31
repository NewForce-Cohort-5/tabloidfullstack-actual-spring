using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void DeleteComment(int id);
    }
}