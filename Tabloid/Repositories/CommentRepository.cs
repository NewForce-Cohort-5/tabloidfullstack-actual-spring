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
                       p.ImageLocation AS PostImageUrl, p.UserProfileId AS PostUserProfileId, p.PublishDateTime, p.IsApproved, p.CatagoryId AS PostCatagoryId,
                       up.FullName as UserProfileName, up.FirstName, up.LastName, up.Email, up.CreateDateTime AS UserProfileDateCreated,
                       up.ImageLocation AS UserProfileImageUrl, up.UserTypeId,
                       c.Id AS CommentId, c.Content, c.UserProfileId AS CommentUserProfileId, c.PostId as CommentPostId, c.Subject, c.CreateDateTime
                       cup.DisplayName as CommentUserName
                        
                  FROM Post p
                       LEFT JOIN UserProfile up ON p.UserProfileId = up.id
                       LEFT JOIN Comment c on c.PostId = p.id
                       LEFT JOIN UserProfile cup on c.UserProfileId = cup.Id
                       WHERE p.Id = @Id
              ORDER BY p.DateCreated";

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
                                CatagoryId = DbUtils.GetInt(reader, "PostUserCatagoryId"),
                                Catagory = new Catagory()
                                {

                                }
                                UserProfile = new UserProfile()
                                {
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
                                Message = DbUtils.GetString(reader, "Message"),
                                PostId = DbUtils.GetInt(reader, "PostId"),
                                UserProfileId = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "CommentUserProfileId"),
                                    Name = DbUtils.GetString(reader, "CommentUserName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                    ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
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
