using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration config) : base(config) { }
   
        public void AddComment(Comment comment)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Comment (Subject, Content, PostId, UserProfileId, CreateDateTime)
                    OUTPUT INSERTED.Id
                    VALUES (@subject, @content, @postId, @userProfileId, @createDateTime);";
                    //output insterted.Id return the id so we can use with executeScalar to insert ID
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);
                    cmd.Parameters.AddWithValue("@postId", comment.PostId);
                    cmd.Parameters.AddWithValue("@userProfileId", comment.UserProfileId);
                    cmd.Parameters.AddWithValue("@createDateTime", DateTime.Now);




                    int id = (int)cmd.ExecuteScalar();

                    comment.Id = id;
                }
            }
        }

        public void DeleteComment(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Comment
                            WHERE Id = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateComment(Comment comment, int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE Comment
                            SET 
                               Subject = @subject,
                               Content = @content
                                WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@subject", comment.Subject);
                    cmd.Parameters.AddWithValue("@content", comment.Content);





                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}

