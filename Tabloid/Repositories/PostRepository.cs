using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Repositories;
using Tabloid.Utils;
using TabloidFullStack.Models;
//using TabloidFullStack.Utils;


// this is the working branch after the merge conflicts
namespace TabloidFullStack.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration config) : base(config) { }

        //public List<Post> GetAllPosts()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"SELECT id, name 
        //                        FROM Tag
        //                        Order by name asc";
        //            var reader = cmd.ExecuteReader();

        //            var Posts = new List<Post>();

        //            while (reader.Read())
        //            {
        //                Posts.Add(new Post()
        //                {
        //                    Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                    Name = reader.GetString(reader.GetOrdinal("name")),
        //                });
        //            }

        //            reader.Close();

        //            return Posts;
        //        }
        //    }
        //}
        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                        ORDER By p.PublishDateTime Desc";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPostIdWithComments(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                 SELECT p.Id AS PostId, p.Title, p.Content, p.CreateDateTime AS PostDateCreated,
                       p.ImageLocation AS PostImageUrl, p.UserProfileId AS PostUserProfileId, p.PublishDateTime, p.IsApproved, p.CategoryId AS PostCategoryId,
                       up.DisplayName, up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserProfileDateCreated,
                       up.ImageLocation AS UserProfileImageUrl, up.UserTypeId,
                       c.Id AS CommentId, c.Content as CommentContent, c.UserProfileId AS CommentUserProfileId, c.PostId as CommentPostId, c.Subject, c.CreateDateTime as CommentDateTime,
                       cup.DisplayName as CommentUserName, cup.FirstName as CommentUserFirstName, cup.LastName as CommentUserLastName, cup.Email as CommentUserEmail, cup.CreateDateTime AS CommentUserProfileDateCreated,
                       cup.ImageLocation AS CommentUserProfileImageUrl, cup.UserTypeId as CommentUserTypeId,
                       ca.Name as PostCategoryName, ca.Id as PostCategoryId
                        
                  FROM Post p
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                       LEFT JOIN Comment c on c.PostId = p.id
                       LEFT JOIN UserProfile cup on c.UserProfileId = cup.Id
                       LEFT JOIN Category ca on ca.Id = p.CategoryId
                       WHERE p.Id = @Id
                       ORDER BY c.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    while (reader.Read())
                    {
                        if (post == null)
                        {
                            post = new Post()
                            {

                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Content = DbUtils.GetString(reader, "Content"),
                                /*                                IsApproved = DbUtils.GetNullableInt(reader, "IsApproved"),
                                */
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
                                UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
                                CategoryId = DbUtils.GetInt(reader, "PostCategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "PostCategoryId"),
                                    Name = DbUtils.GetString(reader, "PostCategoryName")

                                },
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "PostUserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                    UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                                    /*  UserType = new UserType()
                                      { 

                                      }*/
                                },
                                Comments = new List<Comment>()
                            };

                        }

                        if (DbUtils.IsNotDbNull(reader, "CommentId"))
                        {
                            post.Comments.Add(new Comment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                Subject = DbUtils.GetString(reader, "Subject"),
                                Content = DbUtils.GetString(reader, "CommentContent"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CommentDateTime"),
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "CommentUserFirstName"),
                                    LastName = DbUtils.GetString(reader, "CommentUserLastName"),
                                    DisplayName = DbUtils.GetString(reader, "CommentUserName"),
                                    Email = DbUtils.GetString(reader, "CommentUserEmail"),
                                    ImageLocation = DbUtils.GetString(reader, "CommentUserProfileImageUrl"),
                                }
                            });
                        }
                    }
                    reader.Close();

                    return post;
                }
            }
        }

        public Post GetPublishedPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content,
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName,
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId,
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE IsApproved = 1 AND PublishDateTime < SYSDATETIME()
                              AND p.id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();
                    Post post = null;
                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }
                    reader.Close();
                    return post;
                }
            }
        }

        public Post GetUserPostById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE p.id = @id AND p.UserProfileId = @userProfileId";

                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        //this is for ALL posts of both published and unpublished by the userId and this is used for print a list after the user clicks my post in the menu
        public List<Post> GetUserPostById(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE p.UserProfileId = @userProfileId
                        ORDER By p.CreateDateTime Desc";

                    cmd.Parameters.AddWithValue("@userProfileId", userProfileId);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Content, ImageLocation, CreateDateTime, PublishDateTime,
                            IsApproved, CategoryId, UserProfileId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Content, @ImageLocation, @CreateDateTime, @PublishDateTime,
                            @IsApproved, @CategoryId, @UserProfileId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", DbUtils.ValueOrDBNull(post.ImageLocation));
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", DbUtils.ValueOrDBNull(post.PublishDateTime));
                    cmd.Parameters.AddWithValue("@IsApproved", post.IsApproved);
                    //cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Delete FROM POST
                    WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@id", postId);
                    cmd.ExecuteNonQuery();
                }
            }

        }

        public List<Post> GetUserTagByPostId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SSELECT pt.tagId as 'TagID', pt.postId as 'PostId', t.name as 'Tag Name'
                         FROM PostTag pt
                              LEFT JOIN tag t ON pt.tagId = t.id
                              LEFT JOIN Post p ON pt.postId = p.id
                             where pt.postId = @id";

                    cmd.Parameters.AddWithValue("@userProfileId", id);
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetNullableString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                //CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //Category = new Category() {
                //    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                //},
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }
    }
}