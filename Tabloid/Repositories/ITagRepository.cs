using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ITagRepository
    {

        List<Tag> GetAllTags();

        Tag GetTagById(int id);
        void DeleteTag(int TagId);

        void AddTag(Tag tag);

        void UpdateTag(Tag tag, int id);
    }
}
