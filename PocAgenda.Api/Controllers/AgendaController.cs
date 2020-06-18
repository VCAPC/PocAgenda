using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Microsoft.Net.Http.Headers;
using PocAgenda.DataLayer;
using PocAgenda.Entities.Dto;
using PocAgenda.Entities.Models;
using System.Collections.Generic;
using System.Linq;

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

        [HttpGet]
        public IActionResult List()
        {
            try
            {
                if (ControllerContext.HttpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out StringValues userId))
                {
                    string user = userId.ToString().Replace("Bearer ", "").Trim();
                    List<Contacts> results = DContext.Contacts.Where(x => x.UserId == user)
                        .Include(x => x.Phones)
                        .ToList();
                    foreach (var contact in results)
                    {
                        RemoveNestedChilds(contact);
                    }
                    return Ok(new ResponseDataDto<List<Contacts>>() { Data = results, Success = true });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        private static void RemoveNestedChilds(Contacts contact)
        {
            contact.Phones = contact.Phones.ToList();
            foreach (var phone in contact.Phones)
            {
                phone.Contact = null;
            }
        }

        [HttpPost]
        public IActionResult Save(Contacts model)
        {
            try
            {
                if (ControllerContext.HttpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out StringValues userId))
                {
                    string user = userId.ToString().Replace("Bearer ", "").Trim();
                    model.UserId = user;
                    DContext.Contacts.Add(model);
                    DContext.SaveChanges();
                    RemoveNestedChilds(model);
                    return Ok(new ResponseDataDto<Contacts> { Data = model, Success = true });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult Update(Contacts model)
        {
            try
            {
                if (ControllerContext.HttpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out StringValues userId))
                {
                    string user = userId.ToString().Replace("Bearer ", "").Trim();
                    model.UserId = user;
                    Contacts current = DContext.Contacts
                        .Include(x => x.Phones)
                        .FirstOrDefault(x => x.Id == model.Id);
                    DContext.Entry(current).CurrentValues.SetValues(model);
                    List<ContactPhones> phones = current.Phones.ToList();
                    foreach (ContactPhones phone in phones)
                    {
                        var exists = model.Phones.FirstOrDefault(x => x.Id == phone.Id);
                        if (exists != null)
                        {
                            DContext.Entry(phone).CurrentValues.SetValues(exists);
                        }
                        else
                        {
                            DContext.Remove(phone);
                        }
                    }
                    foreach (var currentPhone in model.Phones)
                    {
                        if (phones.All(i => i.Id != currentPhone.Id))
                        {
                            current.Phones.Add(currentPhone);
                        }
                    }
                    DContext.SaveChanges();
                    RemoveNestedChilds(model);
                    return Ok(new ResponseDataDto<Contacts> { Data = model, Success = true });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Delete(int id)
        {
            try
            {
                if (ControllerContext.HttpContext.Request.Headers.TryGetValue(HeaderNames.Authorization, out StringValues userId))
                {
                    string user = userId.ToString().Replace("Bearer ", "").Trim();
                    Contacts model = DContext.Contacts
                        .Include(x => x.Phones)
                        .FirstOrDefault(x => x.Id == id);
                    List<ContactPhones> phones = model.Phones.ToList();
                    DContext.ContactPhones.RemoveRange(phones);
                    DContext.Contacts.Remove(model);
                    DContext.SaveChanges();
                    RemoveNestedChilds(model);
                    return Ok(new ResponseDataDto<Contacts> { Data = model, Success = true });
                }
                else
                {
                    return Unauthorized();
                }
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
