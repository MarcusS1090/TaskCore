using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskCore.Models;

namespace TaskCore.Controllers
{
    public class UsuariosController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly ApplicationDbContext context;

        public UsuariosController(UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager, ApplicationDbContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
        }

        [AllowAnonymous]
        public IActionResult Registro()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Registro(RegistroViewModel modelo)
        {
            if (!ModelState.IsValid)
            {
                return View(modelo);
            }
            var usuario = new IdentityUser()
            {
                UserName = modelo.Email,
                Email = modelo.Email
            };
            var resultado = await userManager.CreateAsync(usuario, modelo.Password);
            if (resultado.Succeeded)
            {
                await signInManager.SignInAsync(usuario, isPersistent: true);
                return RedirectToAction("Index", "Home");
            }
            foreach (var error in resultado.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return View(modelo);
        }

        [AllowAnonymous]
        public IActionResult Login(string mensaje = null)
        {
            if (mensaje is not null)
            {
                ViewData["mensaje"] = mensaje;
            }
            return View();
        }
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel modelo)
        {
            if (!ModelState.IsValid)
            {
                return View(modelo);
            }
            var resultado = await signInManager.PasswordSignInAsync(modelo.Email,
                modelo.Password, modelo.Recuerdame, lockoutOnFailure: false);
            if (resultado.Succeeded)
            {
                return RedirectToAction("Index", "Home");
            }
            ModelState.AddModelError(string.Empty, "Intento de inicio de sesión no válido.");
            return View(modelo);
        }
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return RedirectToAction("Index", "Home");
        }

        [AllowAnonymous]
        [HttpGet]
        public ChallengeResult LoginExterno(string proovedor, string urlRetorno = null)
        {
            var urlRedireccion = Url.Action("RegistrarUsuarioExterno", values: new { urlRetorno });
            var propiedades = signInManager.ConfigureExternalAuthenticationProperties(proovedor, urlRedireccion);
            return new ChallengeResult(proovedor, propiedades);
        }

        [AllowAnonymous]
        public async Task<IActionResult> RegistrarUsuarioExterno(string urlRetorno = null, string remoteError = null)
        {
            urlRetorno = urlRetorno ?? Url.Content("~/");

            var mensaje = "";
            if (remoteError is not null)
            {
                mensaje = $"Error del proovedor externo: {remoteError}";
                return RedirectToAction("Login", routeValues: new { mensaje });
            }

            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info is null)
            {
                mensaje = "Error al obtener la información del inicio de sesión externo.";
                return RedirectToAction("Login", routeValues: new { mensaje });
            }

            var resultadoLoginExterno = await signInManager
                .ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: true, bypassTwoFactor: true);

            //La cuenta existe
            if (resultadoLoginExterno.Succeeded)
            {
                return LocalRedirect(urlRetorno);
            }

            string email = "";

            if (info.Principal.HasClaim(c => c.Type == ClaimTypes.Email))
            {
                email = info.Principal.FindFirstValue(ClaimTypes.Email);
            }
            else
            {
                mensaje = "El proovedor externo no ha proporcionado un correo electrónico.";
                return RedirectToAction("Login", routeValues: new { mensaje });
            }

            var usuario = new IdentityUser { Email = email, UserName = email };

            var resultadoCreacionUsuario = await userManager.CreateAsync(usuario);

            if (!resultadoCreacionUsuario.Succeeded)
            {
                mensaje = resultadoCreacionUsuario.Errors.First().Description;
                return RedirectToAction("Login", routeValues: new { mensaje });
            }

            var resultadoAgregarLogin = await userManager.AddLoginAsync(usuario, info);

            if (resultadoAgregarLogin.Succeeded)
            {
                await signInManager.SignInAsync(usuario, isPersistent: true, info.LoginProvider);
                return LocalRedirect(urlRetorno);
            }
            mensaje = "Ha ocurrido un error agregando el login";
            return RedirectToAction("Login", routeValues: new { mensaje });
        }

        [HttpGet]
        public async Task<IActionResult> Listado(string mensaje = null)
        { 
            var usuarios = await context.Users.Select(u => new UsuarioViewModel 
            {
                Email = u.Email
            }).ToListAsync();

            var modelo = new UsuariosListadoViewModel
            {
                Usuarios = usuarios,
                Mensaje = mensaje
            };
            return View(modelo);
        }
    }    
}
