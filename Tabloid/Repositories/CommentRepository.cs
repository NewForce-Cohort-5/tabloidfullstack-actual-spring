using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CommentRepository
    {
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
                       c.Id AS CommentId, c.Content, c.UserProfileId AS CommentUserProfileId, c.PostId as CommentPostId, c.Subject, c.CreateDateTime as CommentDateTime,
                       cup.DisplayName as CommentUserName, cup.FirstName as CommentUserFirstName, cup.LastName as CommentUserLastName, cup.Email as CommentUserEmail, cup.CreateDateTime AS CommentUserProfileDateCreated,
                       cup.ImageLocation AS CommentUserProfileImageUrl, cup.UserTypeId as CommentUserTypeId,
                       ca.Name as PostCategoryName, ca.Id as PostCategoryId
                        
                  FROM Post p
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                       LEFT JOIN Comment c on c.PostId = p.id
                       LEFT JOIN UserProfile cup on c.UserProfileId = cup.Id
                       LEFT JOIN Category ca on ca.Id = p.CategoryId
                       WHERE p.Id = @Id
                       ORDER BY p.CreateDateTime DESC";

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
                                IsApproved = DbUtils.GetString(reader, "IsApproved"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "PostDateCreated"),
                                PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                ImageLocation = DbUtils.GetString(reader, "PostImageUrl"),
                                UserProfileId = DbUtils.GetInt(reader, "PostUserProfileId"),
                                CategoryId = DbUtils.GetInt(reader, "PostUserCategoryId"),
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
                                Content = DbUtils.GetString(reader, "Content"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CommentDateTime"),
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "CommentUserFirstName"),
                                    LastName = DbUtils.GetString(reader, "CommentUserLastName"),
                                    DisplayName = DbUtils.GetString(reader, "CommentUserDisplayName"),
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
    }
}