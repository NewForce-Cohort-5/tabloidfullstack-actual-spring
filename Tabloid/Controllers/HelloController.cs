using Microsoft.AspNetCore.Mvc;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Hello()
        {
            return Content("hello");
        }
    }
}
