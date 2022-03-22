


using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories

{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public class TagRepository : BaseRepository,
       ITagRepository
        {
            public TagRepository(IConfiguration config) : base(config) { }
            public List<Tag> GetAllTags()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = "SELECT id, name FROM Tag";
                        var reader = cmd.ExecuteReader();

                        var Tags = new List<Tag>();

                        while (reader.Read())
                        {
                            Tags.Add(new Tag()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("name")),
                            });
                        }

                        reader.Close();

                        return Tags;
                    }
                }
            }

            public Tag GetTagById(int id)
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();

                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM Tag
                        WHERE Id = @id";

                        cmd.Parameters.AddWithValue("@id", id);

                        SqlDataReader reader = cmd.ExecuteReader();

                        if (reader.Read())
{
                            Tag tag = new Tag()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),

                            };

                            reader.Close();
                            return tag;
                        }

                        reader.Close();
                        return null;
                    }
                }
            }


            public void AddTag(Tag tag)
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                    INSERT INTO Tag ([Name])
                    OUTPUT INSERTED.Id
                    VALUES (@name);";
                        //output insterted.Id return the id so we can use with executeScalar to insert ID
                        cmd.Parameters.AddWithValue("@name", tag.Name);


                        int id = (int)cmd.ExecuteScalar();

                        tag.Id = id;
                    }
                }
            }


            public void UpdateTag(Tag tag, int id)
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();

                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            UPDATE Tag
                            SET 
                               [Name] = @name 
                               WHERE Id = @id";

                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.Parameters.AddWithValue("@name", tag.Name);



                        cmd.ExecuteNonQuery();
                    }
                }
            }
            public void DeleteTag(int TagId)
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();

                    using (SqlCommand cmd = conn.CreateCommand())
    {
                        cmd.CommandText = @"
                            DELETE FROM Tag
                            WHERE Id = @id
                        ";

                        cmd.Parameters.AddWithValue("@id", TagId);

                        cmd.ExecuteNonQuery();
                    }
                }
            }
        }
    }
}
