using System.Security.Claims;

namespace TaskCore.Servicios
{
    public interface IServicioUsuarios
    {
        string ObtenerUsuarioId();
    }

    public class ServicioUsuarios : IServicioUsuarios
    {
        private readonly HttpContext httpContext;
        public ServicioUsuarios(IHttpContextAccessor httpContextAccessor) 
        {
            httpContext = httpContextAccessor.HttpContext;
        }
        public string ObtenerUsuarioActual()
        {
            throw new NotImplementedException();
        }

        public string ObtenerUsuarioId()
        {
            if (httpContext.User.Identity.IsAuthenticated)
            {
                var idClaim = httpContext.User.Claims.Where(x => x.Type == ClaimTypes.NameIdentifier).FirstOrDefault();
                return idClaim.Value;
            }
            else 
            {
                throw new Exception("El usuario no esta autenticado");
            }
        }
    }

}
