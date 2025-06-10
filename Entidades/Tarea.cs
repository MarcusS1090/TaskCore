using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace TaskCore.Entidades
{
    public class Tarea
    {
        public int Id { get; set; }
        [StringLength(100)]
        [Required]
        public string Titulo { get; set; }
        [StringLength(250)]

        public string Descripcion { get; set; }
        public int Orden { get; set; }
        public DateTime FechaCreacion { get; set; }
        //
        public List<Paso> Pasos { get; set; }
        public List<ArchivoAdjunto> ArchivosAdjuntos { get; set; }
        public string UsuarioCreacionId { get; set; }
        public IdentityUser UsuarioCreacion { get; set; }
    }
}
