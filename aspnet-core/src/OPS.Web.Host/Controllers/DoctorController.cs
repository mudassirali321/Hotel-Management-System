using AutoMapper.Configuration;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace OPS.Web.Host.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("_defaultCorsPolicyName")]
    public class DoctorController : ControllerBase
    {
        private readonly IConfiguration _config;
        public DoctorController(IConfiguration config)
        {
            _config = config;
        
        }
        [HttpPost("CreateDoctor")]
        public IActionResult Create()
        {
            return Ok("Success from Create Method");

        }
    }
}
