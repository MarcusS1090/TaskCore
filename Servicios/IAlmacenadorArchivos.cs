using TaskCore.Models;

namespace TaskCore.Servicios
{
    public interface IAlmacenadorArchivos
    {
        Task Borrar(string ruta, string contenedor);
        Task<AlmacenarArchivoResultado[]> Almacenar(string contenedor,
            IEnumerable<IFormFile> archivos);
    }
}
