using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Client.Repositories.Data;
using Client.ViewModel;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Client.Controllers
{
    public class AuthController : Controller
    {
        //private readonly AuthRepository authRepository;

        //public AuthController(AuthRepository authRepository)
        //{
        //    this.authRepository = authRepository;
        //}
        // GET: /<controller>/
        public IActionResult ChangePassword()
        {
            return View();
        }

        //[HttpPost]
        //public async Task<JsonResult> Login(LoginVM loginVM)
        //{
        //    var result = await authRepository.Auth(loginVM);
        //    if(result.login != null)
        //    {
        //        HttpContext.Session.SetString("JWToken", result.login);
        //    }
        //    return Json(result);
        //}
        public IActionResult Login()
        {
            return View();
        }

        //[HttpPost]
        //public async Task<JsonResult> Login(LoginVM loginVM)
        //{
        //    var result = await authRepository.Auth(loginVM);
        //    if(result.login != null)
        //    {
        //        HttpContext.Session.SetString("JWToken", result.login);
        //    }
        //    return Json(result);
        //}

       
        public IActionResult ResetPassword()
        {
            return View();
        }
        public IActionResult Register()
        {
            return View();
        }
        public IActionResult ForgotPassword()
        {
            return View();
        }
        public IActionResult NewPassword()
        {
            return View();
        }
    }
}

