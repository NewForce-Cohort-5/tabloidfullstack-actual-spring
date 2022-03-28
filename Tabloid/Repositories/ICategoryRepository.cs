using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        public void Add(Category category);
        public void Update(Category category);
        public void Delete(int categoryId);
        public Category GetById(int id);
    }
}