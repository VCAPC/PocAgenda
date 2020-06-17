using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PocAgenda.Entities.Dto;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace PocAgenda.Api.Controllers
{
    [Route("api/security")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        public SignInManager<IdentityUser> Manager { get; set; }
        public UserManager<IdentityUser> UserManager { get; set; }

        public SecurityController(SignInManager<IdentityUser> manager, UserManager<IdentityUser> userManager)
        {
            Manager = manager;
            UserManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginDto model)
        {
            try
            {
                IdentityUser user = UserManager.FindByNameAsync(model.Username).Result;
                if (user is IdentityUser)
                {
                    SignInResult result = Manager.CheckPasswordSignInAsync(user, model.Password, true).Result;
                    if (result == SignInResult.Success)
                    {
                        IList<Claim> claims = UserManager.GetClaimsAsync(user).Result;
                        return Ok(new ResponseDataDto<string> { Data = user.Id, Success = true });
                    }
                    else
                    {
                        return Unauthorized();
                    }
                }
                return BadRequest();
            }
            catch
            {
                return Unauthorized();
            }
        }
    }
}
