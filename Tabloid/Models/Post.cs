using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace Gifter.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [Required]
        public string ImageLocation { get; set; }

        [Required]
        public DateTime CreateDateTime { get; set; }

        [Required]
        public DateTime PublishDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        //isApproved

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public int UserProfileId { get; set; }


        //[Required]
        //public string ImageUrl { get; set; }

        //public string Caption { get; set; }

        //public UserProfile UserProfile { get; set; }

        //public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}