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
        public IActionResult Get(int id)
        {
            var tag = _tagRepo.GetTagById(id);
            if (tag == null)
            {
                return NotFound();
            }
            return Ok(tag);
        }

        // POST api/<TagController>
        [HttpPost]
        public void Post(Tag tag)
        {
            _tagRepo.AddTag(tag);
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            if (id != tag.Id)
            {
                return BadRequest();
            }

            _tagRepo.UpdateTag(tag, id);
            return NoContent();
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
