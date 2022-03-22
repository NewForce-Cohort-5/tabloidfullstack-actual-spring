using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile userProfile);
        List<UserProfile> GetAllUsers();
        UserProfile GetByEmail(string email);
    }
}