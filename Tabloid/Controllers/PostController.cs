using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TabloidFullStack.Repositories;
using System.Collections.Generic;
using Tabloid.Repositories;
using Tabloid.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }
        //ok takes the C# data into JSON data and send it to the client as a response.  

        //used for post detail
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);

            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }



        [HttpGet("/GetPostIdWithComments/{id}")]
        public IActionResult GetPostIdWithComments(int id)
        {
            var post = _postRepository.GetPostIdWithComments(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }



        [HttpPost("AddTagToPost")]
        public void Post(PostTag postTag)
        {
            _postRepository.AddTagToPost(postTag);
        }





    }
}
