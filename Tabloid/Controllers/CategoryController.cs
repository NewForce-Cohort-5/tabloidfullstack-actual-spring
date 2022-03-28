using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        // GET: api/<CategoryController>

        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Post(Category category)
        {
            _categoryRepository.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {

            _categoryRepository.Update(category);
            return NoContent();

        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)

        {
            try
            {
                _categoryRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}
