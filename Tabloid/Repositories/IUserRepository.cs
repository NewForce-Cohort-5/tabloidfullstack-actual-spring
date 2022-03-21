using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByEmail(string email);
    }
}