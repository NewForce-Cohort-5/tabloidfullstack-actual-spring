using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Repositories;
using Tabloid.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        // GET: api/<TagController>
        private readonly ITagRepository _tagRepo;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepo = tagRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepo.GetAllTags());
            
        }

        // GET api/<TagController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TagController>
        [HttpPost]
        public void Post(Tag tag)
        {
            _tagRepo.AddTag(tag);
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepo.DeleteTag(id);
            return NoContent();
        }
    }
}
