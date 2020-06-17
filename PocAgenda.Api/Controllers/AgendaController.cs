using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PocAgenda.DataLayer;
using PocAgenda.Entities.Dto;
using PocAgenda.Entities.Models;

namespace PocAgenda.Api.Controllers
{
    [Route("api/agenda")]
    [ApiController]
    public class AgendaController : ControllerBase
    {
        public DataContext DContext { get; set; }
        public AgendaController(DataContext dContext)
        {
            DContext = dContext;
        }

        [HttpGet("{userId:string}")]
        public IActionResult List(string userId)
        {
            try
            {
                var results = DContext.Contacts.Where(x => x.UserId == userId).ToList();
                return Ok(new ResponseDataDto<List<Contacts>>() { Data = results, Success = true });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
