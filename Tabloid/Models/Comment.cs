using System;

namespace Tabloid.Models
{
    public class Comment
    {
        int Id { get; set; }
        int PostId { get; set; }
        int UserProfileId { get; set; }
        string Subject { get; set; }
        string Content { get; set; }
        DateTime CreateDateTime { get; set; } = DateTime.Now;
        UserProfile UserProfile { get; set; }
        /*Post Post { get; set; }*/
    }
}
